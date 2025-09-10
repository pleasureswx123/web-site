#!/bin/bash

# 智能部署脚本 - 基于文件哈希的增量部署
# 只上传修改过的文件，充分利用浏览器缓存

set -e

# 配置变量
SERVER_IP="60.205.169.140"
SERVER_USER="root"
SERVER_PASSWORD="plea-1234SJY!!@&"
REMOTE_WEB_DIR="/var/www/html"
LOCAL_BUILD_DIR="out"
CACHE_DIR=".deploy-cache"
HASH_FILE="$CACHE_DIR/file-hashes.txt"
REMOTE_HASH_FILE="$CACHE_DIR/remote-hashes.txt"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 开始智能部署...${NC}"

# 检查构建目录是否存在
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    echo -e "${RED}❌ 构建目录 $LOCAL_BUILD_DIR 不存在，请先运行 npm run build${NC}"
    exit 1
fi

# 创建缓存目录
mkdir -p "$CACHE_DIR"

# 函数：计算文件哈希
calculate_hashes() {
    local dir="$1"
    local output_file="$2"
    
    echo -e "${YELLOW}📊 计算文件哈希...${NC}"
    
    # 清空输出文件
    > "$output_file"
    
    # 计算所有文件的 MD5 哈希
    find "$dir" -type f -exec md5sum {} \; | \
    sed "s|$dir/||g" | \
    sort > "$output_file"
    
    echo -e "${GREEN}✅ 哈希计算完成，共 $(wc -l < "$output_file") 个文件${NC}"
}

# 函数：获取远程文件哈希
get_remote_hashes() {
    echo -e "${YELLOW}🔍 获取远程文件哈希...${NC}"
    
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "
        if [ -d '$REMOTE_WEB_DIR' ]; then
            find '$REMOTE_WEB_DIR' -type f -exec md5sum {} \; | sed 's|$REMOTE_WEB_DIR/||g' | sort
        else
            echo ''
        fi
    " > "$REMOTE_HASH_FILE" 2>/dev/null || echo "" > "$REMOTE_HASH_FILE"
    
    echo -e "${GREEN}✅ 远程哈希获取完成，共 $(wc -l < "$REMOTE_HASH_FILE") 个文件${NC}"
}

# 函数：比较哈希并找出需要更新的文件
find_changed_files() {
    echo -e "${YELLOW}🔄 分析文件变化...${NC}"
    
    # 找出新增或修改的文件
    comm -23 "$HASH_FILE" "$REMOTE_HASH_FILE" | cut -d' ' -f3- > "$CACHE_DIR/changed-files.txt"
    
    # 找出需要删除的文件
    comm -13 "$HASH_FILE" "$REMOTE_HASH_FILE" | cut -d' ' -f3- > "$CACHE_DIR/deleted-files.txt"
    
    local changed_count=$(wc -l < "$CACHE_DIR/changed-files.txt")
    local deleted_count=$(wc -l < "$CACHE_DIR/deleted-files.txt")
    
    echo -e "${GREEN}📈 分析结果：${NC}"
    echo -e "  - 新增/修改文件：${YELLOW}$changed_count${NC} 个"
    echo -e "  - 删除文件：${YELLOW}$deleted_count${NC} 个"
    
    if [ $changed_count -eq 0 ] && [ $deleted_count -eq 0 ]; then
        echo -e "${GREEN}🎉 没有文件变化，无需部署！${NC}"
        return 1
    fi
    
    return 0
}

# 函数：上传变更的文件
upload_changed_files() {
    local changed_files="$CACHE_DIR/changed-files.txt"
    
    if [ ! -s "$changed_files" ]; then
        echo -e "${BLUE}ℹ️  没有文件需要上传${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}📤 上传变更的文件...${NC}"
    
    # 创建远程目录结构
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_WEB_DIR"
    
    # 逐个上传文件，保持目录结构
    local count=0
    local total=$(wc -l < "$changed_files")
    
    while IFS= read -r file; do
        if [ -n "$file" ]; then
            count=$((count + 1))
            echo -e "${BLUE}[$count/$total]${NC} 上传: $file"
            
            # 创建远程目录
            remote_dir=$(dirname "$file")
            if [ "$remote_dir" != "." ]; then
                sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_WEB_DIR/$remote_dir"
            fi
            
            # 上传文件
            sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no "$LOCAL_BUILD_DIR/$file" "$SERVER_USER@$SERVER_IP:$REMOTE_WEB_DIR/$file"
        fi
    done < "$changed_files"
    
    echo -e "${GREEN}✅ 文件上传完成${NC}"
}

# 函数：删除远程的过期文件
delete_remote_files() {
    local deleted_files="$CACHE_DIR/deleted-files.txt"
    
    if [ ! -s "$deleted_files" ]; then
        echo -e "${BLUE}ℹ️  没有文件需要删除${NC}"
        return 0
    fi
    
    echo -e "${YELLOW}🗑️  删除过期文件...${NC}"
    
    while IFS= read -r file; do
        if [ -n "$file" ]; then
            echo -e "${RED}删除:${NC} $file"
            sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "rm -f $REMOTE_WEB_DIR/$file"
        fi
    done < "$deleted_files"
    
    echo -e "${GREEN}✅ 文件删除完成${NC}"
}

# 函数：更新 Nginx 配置
update_nginx_config() {
    echo -e "${YELLOW}⚙️  更新 Nginx 配置...${NC}"
    
    # 检查是否存在 SSL 证书
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "
    if [ -f /etc/letsencrypt/live/www.xinliuyuansu.com/fullchain.pem ]; then
        echo 'HTTPS'
    else
        echo 'HTTP'
    fi
    " > "$CACHE_DIR/ssl-status.txt"
    
    local ssl_status=$(cat "$CACHE_DIR/ssl-status.txt")
    
    if [ "$ssl_status" = "HTTPS" ]; then
        sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no temp/nginx-https.conf $SERVER_USER@$SERVER_IP:/etc/nginx/nginx.conf
        echo -e "${GREEN}✅ 已上传 HTTPS nginx 配置${NC}"
    else
        sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no temp/nginx.conf $SERVER_USER@$SERVER_IP:/etc/nginx/nginx.conf
        echo -e "${YELLOW}⚠️  已上传 HTTP nginx 配置（SSL 证书未找到）${NC}"
    fi
    
    # 重启 Nginx
    echo -e "${YELLOW}🔄 重启 Nginx 服务...${NC}"
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "nginx -t && systemctl restart nginx"
    echo -e "${GREEN}✅ Nginx 重启完成${NC}"
}

# 主执行流程
main() {
    # 1. 计算本地文件哈希
    calculate_hashes "$LOCAL_BUILD_DIR" "$HASH_FILE"
    
    # 2. 获取远程文件哈希
    get_remote_hashes
    
    # 3. 比较文件变化
    if ! find_changed_files; then
        exit 0
    fi
    
    # 4. 上传变更的文件
    upload_changed_files
    
    # 5. 删除过期文件
    delete_remote_files
    
    # 6. 更新 Nginx 配置
    update_nginx_config
    
    echo -e "${GREEN}🎉 智能部署完成！${NC}"
    echo ""
    echo -e "${BLUE}🌐 网站访问地址：${NC}"
    echo -e "  - https://www.xinliuyuansu.com （推荐）"
    echo -e "  - https://xinliuyuansu.com"
    echo -e "  - https://web.ti-ai-calculator.com"
    echo -e "  - http://$SERVER_IP/ （备用）"
    echo ""
    echo -e "${BLUE}📊 缓存优化效果：${NC}"
    echo -e "  - 未修改的文件将继续使用浏览器缓存"
    echo -e "  - 只有修改过的文件会重新下载"
    echo -e "  - 大幅提升网站加载速度"
}

# 执行主函数
main "$@"
