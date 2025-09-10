#!/bin/bash

# Nginx 配置验证脚本
# 用于验证优化后的 nginx.conf 配置文件

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

CONFIG_FILE="nginx-optimized.conf"

echo -e "${BLUE}🔍 Nginx 配置验证工具${NC}"
echo -e "${BLUE}=====================${NC}"

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}❌ 配置文件 $CONFIG_FILE 不存在${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 找到配置文件: $CONFIG_FILE${NC}"

# 1. 语法检查
echo -e "\n${YELLOW}1. 语法检查${NC}"
if command -v nginx >/dev/null 2>&1; then
    if nginx -t -c "$(pwd)/$CONFIG_FILE" 2>/dev/null; then
        echo -e "${GREEN}✅ Nginx 配置语法正确${NC}"
    else
        echo -e "${RED}❌ Nginx 配置语法错误${NC}"
        echo -e "${YELLOW}详细错误信息：${NC}"
        nginx -t -c "$(pwd)/$CONFIG_FILE"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  本地未安装 nginx，跳过语法检查${NC}"
    echo -e "${BLUE}💡 建议在服务器上运行: nginx -t${NC}"
fi

# 2. 配置内容分析
echo -e "\n${YELLOW}2. 配置内容分析${NC}"

# 检查 Gzip 配置
if grep -q "gzip on" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ 已启用 Gzip 压缩${NC}"
    gzip_types=$(grep -A 10 "gzip_types" "$CONFIG_FILE" | grep -v "gzip_types" | grep -v "^$" | wc -l)
    echo -e "   支持 ${YELLOW}$gzip_types${NC} 种文件类型压缩"
else
    echo -e "${RED}❌ 未启用 Gzip 压缩${NC}"
fi

# 检查缓存配置
echo -e "\n${BLUE}缓存策略配置：${NC}"

# Next.js 静态资源
if grep -q "/_next/static/" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ Next.js 静态资源缓存配置${NC}"
    if grep -A 3 "/_next/static/" "$CONFIG_FILE" | grep -q "immutable"; then
        echo -e "   ${GREEN}✓${NC} 设置了 immutable 标志"
    fi
else
    echo -e "${RED}❌ 缺少 Next.js 静态资源缓存配置${NC}"
fi

# 字体文件
if grep -q "woff|woff2|ttf|eot" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ 字体文件缓存配置${NC}"
    if grep -A 5 "woff|woff2|ttf|eot" "$CONFIG_FILE" | grep -q "Access-Control-Allow-Origin"; then
        echo -e "   ${GREEN}✓${NC} 设置了 CORS 头"
    fi
else
    echo -e "${RED}❌ 缺少字体文件缓存配置${NC}"
fi

# 图片文件
if grep -q "png|jpg|jpeg|gif" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ 图片文件缓存配置${NC}"
else
    echo -e "${RED}❌ 缺少图片文件缓存配置${NC}"
fi

# HTML 文件
if grep -q "no-cache, no-store, must-revalidate" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ HTML 文件禁用缓存配置${NC}"
else
    echo -e "${RED}❌ 缺少 HTML 文件禁用缓存配置${NC}"
fi

# 3. 安全配置检查
echo -e "\n${YELLOW}3. 安全配置检查${NC}"

security_headers=(
    "X-Frame-Options"
    "X-Content-Type-Options"
    "X-XSS-Protection"
    "Strict-Transport-Security"
    "Referrer-Policy"
)

for header in "${security_headers[@]}"; do
    if grep -q "$header" "$CONFIG_FILE"; then
        echo -e "${GREEN}✅ $header${NC}"
    else
        echo -e "${YELLOW}⚠️  缺少 $header${NC}"
    fi
done

# 4. SSL 配置检查
echo -e "\n${YELLOW}4. SSL 配置检查${NC}"

if grep -q "ssl_protocols TLSv1.2 TLSv1.3" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ 现代 SSL 协议配置${NC}"
else
    echo -e "${YELLOW}⚠️  建议使用 TLSv1.2 和 TLSv1.3${NC}"
fi

if grep -q "ssl_session_cache" "$CONFIG_FILE"; then
    echo -e "${GREEN}✅ SSL 会话缓存配置${NC}"
else
    echo -e "${YELLOW}⚠️  建议配置 SSL 会话缓存${NC}"
fi

# 5. 性能配置检查
echo -e "\n${YELLOW}5. 性能配置检查${NC}"

performance_configs=(
    "sendfile on"
    "tcp_nopush on"
    "tcp_nodelay on"
    "keepalive_timeout"
    "open_file_cache"
)

for config in "${performance_configs[@]}"; do
    if grep -q "$config" "$CONFIG_FILE"; then
        echo -e "${GREEN}✅ $config${NC}"
    else
        echo -e "${YELLOW}⚠️  建议配置 $config${NC}"
    fi
done

# 6. 生成配置摘要
echo -e "\n${YELLOW}6. 配置摘要${NC}"

total_servers=$(grep -c "server {" "$CONFIG_FILE")
echo -e "   服务器块数量: ${YELLOW}$total_servers${NC}"

total_locations=$(grep -c "location" "$CONFIG_FILE")
echo -e "   Location 块数量: ${YELLOW}$total_locations${NC}"

if grep -q "listen 443 ssl http2" "$CONFIG_FILE"; then
    echo -e "   ${GREEN}✓${NC} 支持 HTTP/2"
fi

if grep -q "gzip on" "$CONFIG_FILE"; then
    echo -e "   ${GREEN}✓${NC} 启用压缩"
fi

# 7. 部署建议
echo -e "\n${YELLOW}7. 部署建议${NC}"

echo -e "${BLUE}部署前检查清单：${NC}"
echo -e "   ${GREEN}□${NC} 备份现有配置文件"
echo -e "   ${GREEN}□${NC} 在测试环境验证配置"
echo -e "   ${GREEN}□${NC} 检查 SSL 证书路径"
echo -e "   ${GREEN}□${NC} 验证域名配置"
echo -e "   ${GREEN}□${NC} 准备回滚方案"

echo -e "\n${BLUE}部署命令：${NC}"
echo -e "${YELLOW}# 1. 备份现有配置${NC}"
echo -e "sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.\$(date +%Y%m%d)"
echo -e "\n${YELLOW}# 2. 上传新配置${NC}"
echo -e "scp $CONFIG_FILE root@60.205.169.140:/etc/nginx/nginx.conf"
echo -e "\n${YELLOW}# 3. 测试配置${NC}"
echo -e "ssh root@60.205.169.140 'nginx -t'"
echo -e "\n${YELLOW}# 4. 重启服务${NC}"
echo -e "ssh root@60.205.169.140 'systemctl restart nginx'"

# 8. 验证命令
echo -e "\n${YELLOW}8. 部署后验证${NC}"

echo -e "${BLUE}验证缓存策略：${NC}"
echo -e "${YELLOW}# 测试 HTML 文件（应该禁用缓存）${NC}"
echo -e "curl -I https://www.xinliuyuansu.com/"
echo -e "\n${YELLOW}# 测试静态资源（应该长期缓存）${NC}"
echo -e "curl -I https://www.xinliuyuansu.com/_next/static/chunks/framework-xxx.js"
echo -e "\n${YELLOW}# 测试图片文件（应该长期缓存）${NC}"
echo -e "curl -I https://www.xinliuyuansu.com/images/logo.png"

echo -e "\n${BLUE}监控命令：${NC}"
echo -e "${YELLOW}# 查看访问日志${NC}"
echo -e "sudo tail -f /var/log/nginx/access.log"
echo -e "\n${YELLOW}# 查看错误日志${NC}"
echo -e "sudo tail -f /var/log/nginx/error.log"

echo -e "\n${GREEN}🎉 配置验证完成！${NC}"
echo -e "${BLUE}💡 建议先在测试环境部署，确认无问题后再部署到生产环境。${NC}"
