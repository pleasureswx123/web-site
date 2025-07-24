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
      if (response.statusCode === 200) {
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

// 主要资源文件列表
const assets = [
  // 字体文件
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/SourceHanSansSC-Bold.67e46f5a.woff2',
    path: 'public/fonts/SourceHanSansSC-Bold.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/Novecentosanswide-Medium.7a5c757a.woff2',
    path: 'public/fonts/Novecentosanswide-Medium.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/Oswald-Medium.99836e81.woff2',
    path: 'public/fonts/Oswald-Medium.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/Novecentosanswide-Bold.9c78a9fd.woff2',
    path: 'public/fonts/Novecentosanswide-Bold.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/SourceHanSansSC-Regular.a425d0f0.woff2',
    path: 'public/fonts/SourceHanSansSC-Regular.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/Bender-Bold.b4c7998a.woff2',
    path: 'public/fonts/Bender-Bold.woff2'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/Bender-Regular.6950ba72.woff2',
    path: 'public/fonts/Bender-Regular.woff2'
  },
  
  // 角色立绘
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/kaltsit_e1.a53cfc2e.png',
    path: 'public/images/characters/kaltsit_e1.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/kaltsit.05c0f5e1.png',
    path: 'public/images/characters/kaltsit.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/amiya.a410de75.png',
    path: 'public/images/characters/amiya.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/chen.4d5cd8a0.png',
    path: 'public/images/characters/chen.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/texas.5a198d4c.png',
    path: 'public/images/characters/texas.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/exusiai.ff3d47d4.png',
    path: 'public/images/characters/exusiai.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/ptilopsis.0483cb6d.png',
    path: 'public/images/characters/ptilopsis.png'
  },
  
  // 背景图片
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/bg.c03d00a6.jpg',
    path: 'public/images/backgrounds/bg.jpg'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/bg2.e562d9ae.png',
    path: 'public/images/backgrounds/bg2.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/bg_m.866db098.jpg',
    path: 'public/images/backgrounds/bg_m.jpg'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/bg2_m.aa95d813.png',
    path: 'public/images/backgrounds/bg2_m.png'
  },
  
  // 图标和Logo
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/rhodes_island.18d9416c.png',
    path: 'public/images/logos/rhodes_island.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/qrcode_download.90ed578c.png',
    path: 'public/images/icons/qrcode_download.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/age_rating.61c75d20.png',
    path: 'public/images/icons/age_rating.png'
  },
  
  // 媒体相关图标
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/monster_siren_active.8f01230d.png',
    path: 'public/images/icons/monster_siren_active.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/logo_monster_siren.27beba82.png',
    path: 'public/images/logos/logo_monster_siren.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/gallery_active.d45cfc72.png',
    path: 'public/images/icons/gallery_active.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/logo_gallery.08a04a01.png',
    path: 'public/images/logos/logo_gallery.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/operator_active.d697ef2d.png',
    path: 'public/images/icons/operator_active.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/logo_operator.c6543e50.png',
    path: 'public/images/logos/logo_operator.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/video_active.693c91f3.png',
    path: 'public/images/icons/video_active.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/logo_video.c1de0303.png',
    path: 'public/images/logos/logo_video.png'
  },
  
  // 更多内容相关图标
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/icon-integrated_strategies.05cfb26b.png',
    path: 'public/images/icons/icon-integrated_strategies.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/icon-reclamation_algorithm.54ea704e.png',
    path: 'public/images/icons/icon-reclamation_algorithm.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/icon-animation.4885daff.png',
    path: 'public/images/icons/icon-animation.png'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/icon-terra_historicus.fa655671.png',
    path: 'public/images/icons/icon-terra_historicus.png'
  },
  
  // 更多内容背景图
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/integrated_strategies.a27b34a4.jpg',
    path: 'public/images/more/integrated_strategies.jpg'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/reclamation_algorithm.00fb030e.jpg',
    path: 'public/images/more/reclamation_algorithm.jpg'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/animation.a945a8f3.jpg',
    path: 'public/images/more/animation.jpg'
  },
  {
    url: 'https://web.hycdn.cn/arknights/official/_next/static/media/terra_historicus.70c95ec8.jpg',
    path: 'public/images/more/terra_historicus.jpg'
  },
  
  // 新闻横幅图片
  {
    url: 'https://web.hycdn.cn/upload/image/20250721/51d8df54f9a8543a2a63b9ea324f8b59.png',
    path: 'public/images/banners/news_20250721.png'
  },
  {
    url: 'https://web.hycdn.cn/upload/image/20250714/b63836efe79d82bf64a8bea3beaf2580.jpg',
    path: 'public/images/banners/news_20250714.jpg'
  },
  {
    url: 'https://web.hycdn.cn/upload/image/20250710/88d5bf0206afbae7b1c687d0f84cc57a.jpg',
    path: 'public/images/banners/news_20250710.jpg'
  },
  {
    url: 'https://web.hycdn.cn/upload/image/20250708/9cd2c3685a43cc07cd0cdfdec34f3f3c.jpg',
    path: 'public/images/banners/news_20250708.jpg'
  },
  {
    url: 'https://web.hycdn.cn/upload/image/20240501/79ea8d4bc878cc8a601a3ab6acea7bb4.png',
    path: 'public/images/banners/news_20240501.png'
  }
];

// 主下载函数
async function downloadAssets() {
  console.log('🚀 开始下载明日方舟官网资源文件...\n');
  
  // 创建必要的目录
  const directories = [
    'public/fonts',
    'public/images/characters',
    'public/images/backgrounds',
    'public/images/icons',
    'public/images/logos',
    'public/images/more',
    'public/images/banners'
  ];
  
  directories.forEach(dir => ensureDirectoryExists(dir));
  
  // 下载所有资源
  let successCount = 0;
  let failCount = 0;
  
  for (const asset of assets) {
    try {
      await downloadFile(asset.url, asset.path);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to download ${asset.path}: ${error.message}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 下载完成统计:`);
  console.log(`✅ 成功: ${successCount} 个文件`);
  console.log(`❌ 失败: ${failCount} 个文件`);
  console.log(`📁 总计: ${assets.length} 个文件`);
}

// 运行下载
downloadAssets().catch(console.error);
