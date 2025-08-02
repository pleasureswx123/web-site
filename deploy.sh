#!/bin/bash

# 部署脚本
SERVER_IP="60.205.169.140"
SERVER_USER="root"
SERVER_PASSWORD="plea-1234SJY!!@&"
REMOTE_WEB_DIR="/var/www/html"

echo "开始部署到服务器..."

# 1. 清理服务器上的旧文件
echo "1. 清理服务器上的旧文件..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "rm -rf $REMOTE_WEB_DIR/*"

# 2. 上传静态文件
echo "2. 上传静态文件..."
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -r out/* $SERVER_USER@$SERVER_IP:$REMOTE_WEB_DIR/

# 3. 上传nginx配置
echo "3. 更新nginx配置..."
sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no temp/nginx.conf $SERVER_USER@$SERVER_IP:/etc/nginx/nginx.conf

# 4. 重启nginx
echo "4. 重启nginx服务..."
sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_IP "nginx -t && systemctl restart nginx"

echo "部署完成！"
echo "请访问 http://$SERVER_IP/ 查看网站"
