#!/bin/bash
# 部署到 Vercel 的脚本

echo "======================================"
echo "  🚀 部署天气应用到 Vercel"
echo "======================================"
echo ""

# 检查是否已登录 Vercel
echo "📋 步骤 1/3: 检查 Vercel 登录状态..."
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ 您尚未登录 Vercel"
    echo ""
    echo "请执行以下命令登录："
    echo "  vercel login"
    echo ""
    echo "登录后，重新运行此脚本"
    exit 1
fi

echo "✅ 已登录到 Vercel"
echo ""

# 检查环境变量
echo "📋 步骤 2/3: 检查环境变量..."
if [ ! -f .env ]; then
    echo "⚠️  警告：本地 .env 文件不存在"
    echo ""
    echo "您需要："
    echo "  1. 访问 https://console.qweather.com/ 获取 API Key"
    echo "  2. 在 Vercel 项目设置中添加环境变量："
    echo "     名称: VITE_WEATHER_API_KEY"
    echo "     值: 您的 API Key"
    echo ""
else
    echo "✅ 本地 .env 文件存在"
    if ! grep -q "VITE_WEATHER_API_KEY=your" .env 2>/dev/null; then
        echo "✅ API Key 已配置"
    else
        echo "⚠️  请先在 .env 文件中配置 API Key"
    fi
fi
echo ""

# 部署
echo "📋 步骤 3/3: 开始部署..."
echo ""
vercel --prod
