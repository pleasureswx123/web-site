#!/usr/bin/env node

/**
 * 缓存验证工具
 * 测试网站的缓存策略是否正确配置
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// 配置
const WEBSITE_URLS = [
    'https://www.xinliuyuansu.com',
    'https://xinliuyuansu.com',
    'https://web.ti-ai-calculator.com'
];

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

// 发送 HTTP 请求
function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;
        
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname + urlObj.search,
            method: 'HEAD',
            headers: {
                'User-Agent': 'Cache-Validator/1.0'
            }
        };
        
        const req = client.request(options, (res) => {
            resolve({
                statusCode: res.statusCode,
                headers: res.headers,
                url: url
            });
        });
        
        req.on('error', reject);
        req.setTimeout(10000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.end();
    });
}

// 解析 Cache-Control 头
function parseCacheControl(cacheControl) {
    if (!cacheControl) return {};
    
    const directives = {};
    cacheControl.split(',').forEach(directive => {
        const [key, value] = directive.trim().split('=');
        directives[key] = value || true;
    });
    
    return directives;
}

// 验证缓存策略
function validateCacheStrategy(response, expectedStrategy) {
    const { headers } = response;
    const cacheControl = parseCacheControl(headers['cache-control']);
    
    const result = {
        url: response.url,
        passed: true,
        issues: [],
        recommendations: [],
        headers: {
            'cache-control': headers['cache-control'],
            'expires': headers['expires'],
            'etag': headers['etag'],
            'last-modified': headers['last-modified']
        }
    };
    
    // 检查 Cache-Control
    if (expectedStrategy.type === 'long-term') {
        if (!cacheControl['max-age'] || parseInt(cacheControl['max-age']) < 31536000) {
            result.passed = false;
            result.issues.push('长期缓存文件的 max-age 应该设置为 31536000 (1年)');
        }
        
        if (!cacheControl['immutable']) {
            result.recommendations.push('建议添加 immutable 指令以优化缓存');
        }
        
        if (!cacheControl['public']) {
            result.recommendations.push('建议添加 public 指令允许代理缓存');
        }
    } else if (expectedStrategy.type === 'no-cache') {
        if (!cacheControl['no-cache'] && !cacheControl['no-store']) {
            result.passed = false;
            result.issues.push('HTML 文件应该禁用缓存');
        }
    } else if (expectedStrategy.type === 'medium-term') {
        if (!cacheControl['max-age'] || parseInt(cacheControl['max-age']) < 86400) {
            result.passed = false;
            result.issues.push('中期缓存文件的 max-age 应该至少为 86400 (1天)');
        }
    }
    
    // 检查压缩
    if (expectedStrategy.shouldCompress && !headers['content-encoding']) {
        result.recommendations.push('建议启用 Gzip 或 Brotli 压缩');
    }
    
    // 检查安全头
    if (expectedStrategy.checkSecurity) {
        const securityHeaders = [
            'x-content-type-options',
            'x-frame-options',
            'x-xss-protection'
        ];
        
        securityHeaders.forEach(header => {
            if (!headers[header]) {
                result.recommendations.push(`建议添加 ${header} 安全头`);
            }
        });
    }
    
    return result;
}

// 测试资源类型
async function testResourceTypes(baseUrl) {
    const testCases = [
        {
            path: '/',
            type: 'HTML',
            strategy: { type: 'no-cache', checkSecurity: true }
        },
        {
            path: '/index.html',
            type: 'HTML',
            strategy: { type: 'no-cache', checkSecurity: true }
        },
        {
            path: '/_next/static/css/167de4ede5578636.css',
            type: 'CSS (with hash)',
            strategy: { type: 'long-term', shouldCompress: true }
        },
        {
            path: '/images/logo.png',
            type: 'Image',
            strategy: { type: 'long-term' }
        },
        {
            path: '/fonts/font.woff2',
            type: 'Font',
            strategy: { type: 'long-term' }
        },
        {
            path: '/audio/bgm.mp3',
            type: 'Audio',
            strategy: { type: 'long-term' }
        }
    ];
    
    log(`\n🔍 测试 ${baseUrl} 的缓存策略...`, 'blue');
    
    const results = [];
    
    for (const testCase of testCases) {
        const url = baseUrl + testCase.path;
        
        try {
            log(`   测试 ${testCase.type}: ${testCase.path}`, 'cyan');
            const response = await makeRequest(url);
            
            if (response.statusCode === 404) {
                log(`     ⚠️  文件不存在 (404)`, 'yellow');
                continue;
            }
            
            const validation = validateCacheStrategy(response, testCase.strategy);
            results.push(validation);
            
            if (validation.passed) {
                log(`     ✅ 缓存策略正确`, 'green');
            } else {
                log(`     ❌ 缓存策略有问题`, 'red');
                validation.issues.forEach(issue => {
                    log(`        - ${issue}`, 'red');
                });
            }
            
            if (validation.recommendations.length > 0) {
                validation.recommendations.forEach(rec => {
                    log(`        💡 ${rec}`, 'yellow');
                });
            }
            
        } catch (error) {
            log(`     ❌ 请求失败: ${error.message}`, 'red');
        }
    }
    
    return results;
}

// 生成测试报告
function generateReport(allResults) {
    log('\n📊 缓存验证报告', 'blue');
    log('='.repeat(50), 'blue');
    
    let totalTests = 0;
    let passedTests = 0;
    let totalIssues = 0;
    let totalRecommendations = 0;
    
    allResults.forEach(siteResults => {
        siteResults.forEach(result => {
            totalTests++;
            if (result.passed) passedTests++;
            totalIssues += result.issues.length;
            totalRecommendations += result.recommendations.length;
        });
    });
    
    log(`\n📈 总体统计:`, 'green');
    log(`   - 总测试数: ${totalTests}`, 'cyan');
    log(`   - 通过测试: ${passedTests}`, 'green');
    log(`   - 失败测试: ${totalTests - passedTests}`, 'red');
    log(`   - 发现问题: ${totalIssues}`, 'red');
    log(`   - 优化建议: ${totalRecommendations}`, 'yellow');
    
    const successRate = ((passedTests / totalTests) * 100).toFixed(1);
    log(`   - 成功率: ${successRate}%`, successRate > 80 ? 'green' : 'yellow');
    
    if (totalIssues === 0) {
        log('\n🎉 恭喜！所有缓存策略都配置正确！', 'green');
    } else {
        log('\n⚠️  发现一些需要优化的地方，请检查上述建议。', 'yellow');
    }
}

// 主函数
async function main() {
    try {
        log('🚀 开始验证缓存策略...', 'blue');
        
        const allResults = [];
        
        for (const url of WEBSITE_URLS) {
            try {
                const results = await testResourceTypes(url);
                allResults.push(results);
            } catch (error) {
                log(`❌ 无法访问 ${url}: ${error.message}`, 'red');
            }
        }
        
        if (allResults.length === 0) {
            log('❌ 没有可访问的网站进行测试', 'red');
            return;
        }
        
        generateReport(allResults);
        
        log('\n💡 使用建议:', 'blue');
        log('   - 定期运行此工具验证缓存策略', 'cyan');
        log('   - 在部署后立即验证配置是否生效', 'cyan');
        log('   - 使用浏览器开发者工具查看实际缓存行为', 'cyan');
        
    } catch (error) {
        log(`❌ 验证失败: ${error.message}`, 'red');
        process.exit(1);
    }
}

// 运行主函数
if (require.main === module) {
    main();
}

module.exports = {
    makeRequest,
    validateCacheStrategy,
    testResourceTypes
};
