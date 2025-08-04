# HTTPS 配置指南

## 🎯 目标
将网站从 HTTP 升级到 HTTPS，提供安全的加密连接。

## 📋 配置步骤

### 1. 自动配置（推荐）

运行自动化脚本一键配置 HTTPS：

```bash
# 给脚本执行权限
chmod +x scripts/setup-ssl.sh

# 运行 SSL 配置脚本
./scripts/setup-ssl.sh
```

### 2. 手动配置步骤

如果自动脚本失败，可以按以下步骤手动配置：

#### 步骤 1: 连接服务器
```bash
ssh root@60.205.169.140
```

#### 步骤 2: 安装 Certbot
```bash
# 安装 EPEL 仓库
yum install -y epel-release

# 安装 Certbot
yum install -y certbot python3-certbot-nginx
```

#### 步骤 3: 获取 SSL 证书
```bash
# 停止 nginx
systemctl stop nginx

# 获取主域名证书
certbot certonly --standalone \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d www.xinliuyuansu.com \
  -d xinliuyuansu.com

# 获取其他域名证书
certbot certonly --standalone \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d web.ti-ai-calculator.com

certbot certonly --standalone \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d model.ti-ai-calculator.com
```

#### 步骤 4: 更新 nginx 配置
```bash
# 从本地上传 HTTPS 配置
scp temp/nginx-https.conf root@60.205.169.140:/etc/nginx/nginx.conf

# 测试配置
nginx -t

# 启动 nginx
systemctl start nginx
systemctl enable nginx
```

#### 步骤 5: 设置自动续期
```bash
# 添加 crontab 任务
crontab -e

# 添加以下行：
0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'
```

## 🔧 配置文件说明

### nginx-https.conf 主要特性：

1. **HTTP 到 HTTPS 重定向**
   - 所有 HTTP 请求自动重定向到 HTTPS
   - 保留 IP 直接访问用于健康检查

2. **SSL 安全配置**
   - 支持 TLS 1.2 和 1.3
   - 强加密套件
   - HSTS 安全头

3. **安全头配置**
   - `Strict-Transport-Security`: 强制 HTTPS
   - `X-Frame-Options`: 防止点击劫持
   - `X-Content-Type-Options`: 防止 MIME 类型嗅探
   - `X-XSS-Protection`: XSS 保护

## 🌐 支持的域名

配置完成后，以下域名将支持 HTTPS：

- ✅ `https://www.xinliuyuansu.com`
- ✅ `https://xinliuyuansu.com`
- ✅ `https://web.ti-ai-calculator.com`
- ✅ `https://model.ti-ai-calculator.com`

## 🔍 验证步骤

### 1. 检查证书状态
```bash
ssh root@60.205.169.140 'certbot certificates'
```

### 2. 测试 HTTPS 访问
```bash
# 测试主站
curl -I https://www.xinliuyuansu.com

# 测试重定向
curl -I http://www.xinliuyuansu.com
```

### 3. 在线 SSL 测试
访问 [SSL Labs](https://www.ssllabs.com/ssltest/) 测试 SSL 配置质量。

## 🚨 故障排除

### 问题 1: 证书获取失败
```bash
# 检查域名解析
nslookup www.xinliuyuansu.com

# 检查 80 端口是否被占用
netstat -tlnp | grep :80

# 确保 nginx 已停止
systemctl stop nginx
```

### 问题 2: nginx 配置测试失败
```bash
# 检查配置语法
nginx -t

# 查看详细错误
nginx -t 2>&1
```

### 问题 3: 证书路径错误
```bash
# 检查证书文件是否存在
ls -la /etc/letsencrypt/live/www.xinliuyuansu.com/

# 检查证书权限
ls -la /etc/letsencrypt/live/www.xinliuyuansu.com/fullchain.pem
```

## 📝 维护说明

### 证书续期
Let's Encrypt 证书有效期为 90 天，已配置自动续期：

```bash
# 手动测试续期
certbot renew --dry-run

# 查看续期日志
tail -f /var/log/letsencrypt/letsencrypt.log
```

### 监控证书到期
```bash
# 检查证书到期时间
openssl x509 -in /etc/letsencrypt/live/www.xinliuyuansu.com/fullchain.pem -text -noout | grep "Not After"
```

## 🎉 完成后的效果

1. **安全性提升**
   - 所有数据传输加密
   - 防止中间人攻击
   - 浏览器显示安全锁图标

2. **SEO 优化**
   - Google 优先索引 HTTPS 网站
   - 提升搜索排名

3. **用户体验**
   - 浏览器不再显示"不安全"警告
   - 支持现代 Web 功能（如 PWA）

配置完成后，您的网站将完全支持 HTTPS，并自动将所有 HTTP 流量重定向到安全的 HTTPS 连接！
