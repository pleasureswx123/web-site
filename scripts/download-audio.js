const fs = require('fs');
const path = require('path');
const https = require('https');

// 创建目录的辅助函数
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 下载文件的辅助函数
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200 || response.statusCode === 206) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded: ${path.basename(outputPath)}`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 音频文件列表
const audioAssets = [
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/audio/bgm.ea4286.mp3',
    path: 'public/audio/bgm.mp3'
  }
];

// 主下载函数
async function downloadAudio() {
  console.log('🎵 开始下载明日方舟官网音频文件...\n');
  
  // 创建必要的目录
  ensureDirectoryExists('public/audio');
  
  // 下载所有音频
  let successCount = 0;
  let failCount = 0;
  
  for (const asset of audioAssets) {
    try {
      await downloadFile(asset.url, asset.path);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to download ${asset.path}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 音频下载完成统计:`);
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);
  console.log(`📁 总计: ${audioAssets.length} 个文件`);
}

// 运行下载
downloadAudio().catch(console.error);
