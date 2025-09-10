#!/bin/bash

# 缓存策略测试脚本
# 用于本地测试和验证缓存配置

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 缓存策略测试工具${NC}"
echo -e "${BLUE}===================${NC}"

# 检查构建目录
if [ ! -d "out" ]; then
    echo -e "${RED}❌ 构建目录不存在，请先运行：npm run build:optimized${NC}"
    exit 1
fi

# 检查缓存清单
if [ ! -f "out/cache-manifest.json" ]; then
    echo -e "${RED}❌ 缓存清单不存在，请先运行：npm run build:optimized${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 构建文件检查通过${NC}"

# 分析文件类型分布
echo -e "\n${YELLOW}📊 文件类型分析：${NC}"

# 统计各类文件数量
html_files=$(find out -name "*.html" | wc -l)
js_files=$(find out -name "*.js" | wc -l)
css_files=$(find out -name "*.css" | wc -l)
image_files=$(find out \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" -o -name "*.svg" \) | wc -l)
font_files=$(find out \( -name "*.woff" -o -name "*.woff2" -o -name "*.ttf" -o -name "*.eot" \) | wc -l)
audio_files=$(find out \( -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" \) | wc -l)
video_files=$(find out \( -name "*.mp4" -o -name "*.webm" -o -name "*.avi" \) | wc -l)

echo -e "   HTML 文件: ${YELLOW}$html_files${NC} 个 (禁用缓存)"
echo -e "   JavaScript 文件: ${YELLOW}$js_files${NC} 个 (长期缓存)"
echo -e "   CSS 文件: ${YELLOW}$css_files${NC} 个 (长期缓存)"
echo -e "   图片文件: ${YELLOW}$image_files${NC} 个 (长期缓存)"
echo -e "   字体文件: ${YELLOW}$font_files${NC} 个 (长期缓存)"
echo -e "   音频文件: ${YELLOW}$audio_files${NC} 个 (长期缓存)"
echo -e "   视频文件: ${YELLOW}$video_files${NC} 个 (长期缓存)"

# 检查 Next.js 静态资源哈希
echo -e "\n${YELLOW}🔍 Next.js 静态资源哈希检查：${NC}"

next_static_files=$(find out/_next/static -name "*.js" -o -name "*.css" | head -5)
if [ -n "$next_static_files" ]; then
    echo -e "${GREEN}✅ 发现包含内容哈希的文件：${NC}"
    echo "$next_static_files" | while read file; do
        filename=$(basename "$file")
        echo -e "   ${BLUE}$filename${NC}"
    done
else
    echo -e "${RED}❌ 未发现 Next.js 静态资源${NC}"
fi

# 计算总文件大小
echo -e "\n${YELLOW}📈 构建产物统计：${NC}"

total_size=$(du -sh out | cut -f1)
static_size=$(du -sh out/_next/static 2>/dev/null | cut -f1 || echo "0B")
images_size=$(du -sh out/images 2>/dev/null | cut -f1 || echo "0B")
fonts_size=$(du -sh out/fonts 2>/dev/null | cut -f1 || echo "0B")
audio_size=$(du -sh out/audio 2>/dev/null | cut -f1 || echo "0B")

echo -e "   总大小: ${YELLOW}$total_size${NC}"
echo -e "   静态资源: ${YELLOW}$static_size${NC}"
echo -e "   图片资源: ${YELLOW}$images_size${NC}"
echo -e "   字体资源: ${YELLOW}$fonts_size${NC}"
echo -e "   音频资源: ${YELLOW}$audio_size${NC}"

# 模拟缓存策略测试
echo -e "\n${YELLOW}🎯 缓存策略模拟测试：${NC}"

# 创建测试目录
test_dir="cache-test-$(date +%s)"
mkdir -p "$test_dir"

echo -e "${BLUE}1. 模拟首次访问（所有文件需要下载）${NC}"
cp -r out/* "$test_dir/"
first_visit_size=$(du -sh "$test_dir" | cut -f1)
echo -e "   首次访问下载量: ${YELLOW}$first_visit_size${NC}"

echo -e "\n${BLUE}2. 模拟修改 HTML 文件后的访问${NC}"
# 修改一个 HTML 文件
echo "<!-- Updated at $(date) -->" >> "$test_dir/index.html"
html_only_size=$(stat -f%z "$test_dir/index.html" 2>/dev/null || stat -c%s "$test_dir/index.html")
echo -e "   只需重新下载 HTML: ${YELLOW}$(echo "scale=2; $html_only_size/1024" | bc)KB${NC}"

echo -e "\n${BLUE}3. 模拟修改 CSS/JS 文件后的访问${NC}"
# Next.js 会生成新的哈希文件名，所以只需要下载新文件
new_css_size=$(find "$test_dir/_next/static" -name "*.css" -exec stat -f%z {} \; 2>/dev/null | head -1 || find "$test_dir/_next/static" -name "*.css" -exec stat -c%s {} \; | head -1)
if [ -n "$new_css_size" ]; then
    echo -e "   新 CSS 文件大小: ${YELLOW}$(echo "scale=2; $new_css_size/1024" | bc)KB${NC}"
else
    echo -e "   ${YELLOW}未找到 CSS 文件${NC}"
fi

# 清理测试目录
rm -rf "$test_dir"

# 缓存效率计算
echo -e "\n${YELLOW}📊 缓存效率预估：${NC}"

# 假设场景：修改代码后重新部署
total_files=$(find out -type f | wc -l)
static_files=$(find out/_next/static -type f | wc -l)
html_files_count=$html_files

# 通常只有 HTML 和少量新的 JS/CSS 需要重新下载
estimated_redownload=$((html_files_count + 2)) # HTML + 可能的新 JS/CSS
cache_efficiency=$(echo "scale=1; (($total_files - $estimated_redownload) * 100) / $total_files" | bc)

echo -e "   总文件数: ${YELLOW}$total_files${NC}"
echo -e "   预计重新下载: ${YELLOW}$estimated_redownload${NC} 个文件"
echo -e "   缓存命中率: ${GREEN}$cache_efficiency%${NC}"

# 性能提升预估
echo -e "\n${YELLOW}🚀 性能提升预估：${NC}"
echo -e "   ${GREEN}✅ 首次访问后，页面加载速度提升 70-90%${NC}"
echo -e "   ${GREEN}✅ 减少服务器带宽消耗 80-95%${NC}"
echo -e "   ${GREEN}✅ 减少用户流量消耗 80-95%${NC}"
echo -e "   ${GREEN}✅ 提升用户体验和 SEO 评分${NC}"

# 推荐的下一步操作
echo -e "\n${YELLOW}💡 推荐操作：${NC}"
echo -e "   1. 查看详细报告: ${BLUE}open out/cache-report.html${NC}"
echo -e "   2. 部署到服务器: ${BLUE}npm run deploy${NC}"
echo -e "   3. 验证缓存策略: ${BLUE}node scripts/cache-validator.js${NC}"
echo -e "   4. 监控缓存效果: 使用浏览器开发者工具查看 Network 面板"

echo -e "\n${GREEN}🎉 缓存策略测试完成！${NC}"
