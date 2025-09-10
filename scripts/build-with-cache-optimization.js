#!/usr/bin/env node

/**
 * 构建脚本 - 带缓存优化
 * 自动为静态资源生成版本号，优化缓存策略
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// 配置
const BUILD_DIR = 'out';
const CACHE_MANIFEST_FILE = path.join(BUILD_DIR, 'cache-manifest.json');
const STATIC_EXTENSIONS = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot'];

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 计算文件哈希
function calculateFileHash(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash('md5');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex').substring(0, 8);
}

// 获取文件大小（格式化）
function getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    const bytes = stats.size;
    
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// 递归获取目录中的所有文件
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });
    
    return arrayOfFiles;
}

// 生成缓存清单
function generateCacheManifest() {
    log('📊 生成缓存清单...', 'yellow');
    
    const allFiles = getAllFiles(BUILD_DIR);
    const manifest = {
        version: Date.now(),
        buildTime: new Date().toISOString(),
        files: {},
        summary: {
            totalFiles: 0,
            totalSize: 0,
            staticAssets: 0,
            htmlFiles: 0
        }
    };
    
    allFiles.forEach(filePath => {
        const relativePath = path.relative(BUILD_DIR, filePath);
        const ext = path.extname(filePath);
        const stats = fs.statSync(filePath);
        
        // 跳过缓存清单文件本身
        if (relativePath === 'cache-manifest.json') return;
        
        const fileInfo = {
            hash: calculateFileHash(filePath),
            size: stats.size,
            lastModified: stats.mtime.toISOString(),
            type: STATIC_EXTENSIONS.includes(ext) ? 'static' : 'dynamic'
        };
        
        manifest.files[relativePath] = fileInfo;
        manifest.summary.totalFiles++;
        manifest.summary.totalSize += stats.size;
        
        if (fileInfo.type === 'static') {
            manifest.summary.staticAssets++;
        }
        
        if (ext === '.html') {
            manifest.summary.htmlFiles++;
        }
    });
    
    // 写入缓存清单
    fs.writeFileSync(CACHE_MANIFEST_FILE, JSON.stringify(manifest, null, 2));
    
    log(`✅ 缓存清单生成完成`, 'green');
    log(`   - 总文件数: ${manifest.summary.totalFiles}`, 'cyan');
    log(`   - 静态资源: ${manifest.summary.staticAssets}`, 'cyan');
    log(`   - HTML 文件: ${manifest.summary.htmlFiles}`, 'cyan');
    log(`   - 总大小: ${getFileSize(CACHE_MANIFEST_FILE)}`, 'cyan');
    
    return manifest;
}

// 分析缓存策略
function analyzeCacheStrategy(manifest) {
    log('🔍 分析缓存策略...', 'yellow');
    
    const analysis = {
        longTermCache: [], // 长期缓存（1年）
        mediumTermCache: [], // 中期缓存（1天）
        noCache: [] // 禁用缓存
    };
    
    Object.entries(manifest.files).forEach(([filePath, fileInfo]) => {
        const ext = path.extname(filePath);
        
        if (filePath.startsWith('_next/static/')) {
            // Next.js 静态资源（包含哈希）- 长期缓存
            analysis.longTermCache.push({
                path: filePath,
                reason: 'Next.js static asset with hash',
                cacheControl: 'public, max-age=31536000, immutable'
            });
        } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
            // 字体文件 - 长期缓存
            analysis.longTermCache.push({
                path: filePath,
                reason: 'Font file',
                cacheControl: 'public, max-age=31536000, immutable'
            });
        } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext)) {
            // 图片文件 - 长期缓存
            analysis.longTermCache.push({
                path: filePath,
                reason: 'Image file',
                cacheControl: 'public, max-age=31536000, immutable'
            });
        } else if (['.mp3', '.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.ogg', '.wav'].includes(ext)) {
            // 音视频文件 - 长期缓存
            analysis.longTermCache.push({
                path: filePath,
                reason: 'Media file',
                cacheControl: 'public, max-age=31536000, immutable'
            });
        } else if (['.css', '.js'].includes(ext) && !filePath.startsWith('_next/static/')) {
            // 普通 CSS/JS 文件 - 中期缓存
            analysis.mediumTermCache.push({
                path: filePath,
                reason: 'CSS/JS without hash',
                cacheControl: 'public, max-age=86400, stale-while-revalidate=31536000'
            });
        } else if (ext === '.svg') {
            // SVG 文件 - 中期缓存
            analysis.mediumTermCache.push({
                path: filePath,
                reason: 'SVG file',
                cacheControl: 'public, max-age=86400, stale-while-revalidate=31536000'
            });
        } else if (ext === '.html') {
            // HTML 文件 - 禁用缓存
            analysis.noCache.push({
                path: filePath,
                reason: 'HTML file',
                cacheControl: 'no-cache, no-store, must-revalidate'
            });
        }
    });
    
    log(`📈 缓存策略分析结果:`, 'green');
    log(`   - 长期缓存 (1年): ${analysis.longTermCache.length} 个文件`, 'cyan');
    log(`   - 中期缓存 (1天): ${analysis.mediumTermCache.length} 个文件`, 'cyan');
    log(`   - 禁用缓存: ${analysis.noCache.length} 个文件`, 'cyan');
    
    return analysis;
}

// 生成缓存报告
function generateCacheReport(manifest, analysis) {
    const reportPath = path.join(BUILD_DIR, 'cache-report.html');
    
    const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>缓存策略报告</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { background: white; border: 1px solid #e9ecef; border-radius: 8px; padding: 20px; }
        .card h3 { margin-top: 0; color: #495057; }
        .metric { font-size: 2em; font-weight: bold; color: #007bff; }
        .section { margin-bottom: 30px; }
        .file-list { max-height: 300px; overflow-y: auto; border: 1px solid #e9ecef; border-radius: 4px; }
        .file-item { padding: 8px 12px; border-bottom: 1px solid #f8f9fa; font-family: monospace; font-size: 0.9em; }
        .file-item:last-child { border-bottom: none; }
        .cache-long { background-color: #d4edda; }
        .cache-medium { background-color: #fff3cd; }
        .cache-none { background-color: #f8d7da; }
        .timestamp { color: #6c757d; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 缓存策略报告</h1>
        <p class="timestamp">生成时间: ${manifest.buildTime}</p>
        <p>构建版本: ${manifest.version}</p>
    </div>
    
    <div class="summary">
        <div class="card">
            <h3>总文件数</h3>
            <div class="metric">${manifest.summary.totalFiles}</div>
        </div>
        <div class="card">
            <h3>静态资源</h3>
            <div class="metric">${manifest.summary.staticAssets}</div>
        </div>
        <div class="card">
            <h3>HTML 文件</h3>
            <div class="metric">${manifest.summary.htmlFiles}</div>
        </div>
        <div class="card">
            <h3>总大小</h3>
            <div class="metric">${(manifest.summary.totalSize / 1024 / 1024).toFixed(2)} MB</div>
        </div>
    </div>
    
    <div class="section">
        <h2>🟢 长期缓存文件 (1年)</h2>
        <div class="file-list">
            ${analysis.longTermCache.map(item => 
                `<div class="file-item cache-long">${item.path} <small>(${item.reason})</small></div>`
            ).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>🟡 中期缓存文件 (1天)</h2>
        <div class="file-list">
            ${analysis.mediumTermCache.map(item => 
                `<div class="file-item cache-medium">${item.path} <small>(${item.reason})</small></div>`
            ).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2>🔴 禁用缓存文件</h2>
        <div class="file-list">
            ${analysis.noCache.map(item => 
                `<div class="file-item cache-none">${item.path} <small>(${item.reason})</small></div>`
            ).join('')}
        </div>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(reportPath, html);
    log(`📄 缓存报告已生成: ${reportPath}`, 'green');
}

// 主函数
async function main() {
    try {
        log('🚀 开始构建优化...', 'blue');
        
        // 1. 运行 Next.js 构建
        log('📦 运行 Next.js 构建...', 'yellow');
        execSync('npm run build', { stdio: 'inherit' });
        
        // 2. 检查构建目录
        if (!fs.existsSync(BUILD_DIR)) {
            throw new Error(`构建目录 ${BUILD_DIR} 不存在`);
        }
        
        // 3. 生成缓存清单
        const manifest = generateCacheManifest();
        
        // 4. 分析缓存策略
        const analysis = analyzeCacheStrategy(manifest);
        
        // 5. 生成缓存报告
        generateCacheReport(manifest, analysis);
        
        log('🎉 构建优化完成！', 'green');
        log('💡 提示:', 'blue');
        log('   - 使用 scripts/smart-deploy.sh 进行智能部署', 'cyan');
        log('   - 查看 out/cache-report.html 了解详细缓存策略', 'cyan');
        log('   - Next.js 已自动为 JS/CSS 文件生成内容哈希', 'cyan');
        
    } catch (error) {
        log(`❌ 构建失败: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 运行主函数
if (require.main === module) {
    main();
}

module.exports = {
    generateCacheManifest,
    analyzeCacheStrategy,
    generateCacheReport
};
