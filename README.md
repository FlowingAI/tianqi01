# 🌤️ 实时天气展示应用

一个极具美感的实时天气展示页面，采用苹果风格设计语言，支持北京、上海、深圳三个城市的天气查询。

## ✨ 特性

- **🎨 Apple 风格设计**: 毛玻璃效果、流畅动画、优雅排版
- **🌈 四种天气主题**: 晴天、降雨、下雪、大风，每种都有独特视觉效果
- **⚡ 实时数据**: 集成和风天气 API，提供准确的天气信息
- **💾 智能缓存**: 15分钟数据缓存，减少 API 请求
- **📱 响应式设计**: 完美适配桌面和移动设备
- **♿ 无障碍支持**: 支持键盘导航和屏幕阅读器

## 🚀 快速开始

### 前置要求

- Node.js >= 18.x
- npm 或 yarn

### 安装

```bash
# 克隆项目
git clone <repository-url>
cd weather-app

# 安装依赖
npm install
```

### 配置 API Key

1. 访问 [和风天气开发者平台](https://console.qweather.com/) 注册并获取 API Key
2. 创建 `.env` 文件：

```bash
cp .env.example .env
```

3. 编辑 `.env` 文件，填入您的 API Key：

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

### 运行开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

## 🏗️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式系统
- **Framer Motion** - 动画库
- **Axios** - HTTP 客户端
- **和风天气 API** - 天气数据源

## 📁 项目结构

```
src/
├── components/          # 组件目录
│   ├── CitySelector/   # 城市选择器
│   ├── WeatherBackground/  # 天气背景动画
│   └── WeatherInfo/    # 天气信息卡片
├── hooks/              # 自定义 Hooks
│   └── useWeather.tsx  # 天气状态管理
├── services/            # API 服务
│   └── weatherApi.ts   # 和风天气 API 集成
├── types/              # TypeScript 类型定义
│   └── weather.ts
├── utils/              # 工具函数
│   └── themes.ts       # 天气主题配置
├── App.tsx             # 主应用组件
└── main.tsx            # 应用入口
```

## 🎨 天气主题

| 天气 | 色彩主题 | 动画效果 |
|------|---------|---------|
| ☀️ 晴天 | 金黄色渐变 | 光晕旋转、云朵漂浮 |
| 🌧️ 降雨 | 蓝紫色渐变 | 雨滴下落 |
| ❄️ 下雪 | 银白色渐变 | 雪花飘落、冰晶闪烁 |
| 💨 大风 | 青绿色渐变 | 风向线条流动 |

## 🌐 支持的城市

- **北京** (101010100)
- **上海** (101020100)
- **深圳** (101280601)

## ⚙️ 配置说明

### 环境变量

- `VITE_WEATHER_API_KEY` - 和风天气 API 密钥（必需）

### 缓存策略

- 天气数据缓存时间：15 分钟
- 缓存存储：`localStorage`
- 缓存键格式：`weather_${cityId}`

### API 限制

和风天气免费版限制：
- 每天请求数：1,000 次
- 建议请求频率：最少 15 分钟间隔一次

## 🔧 开发

### 代码风格

项目使用 ESLint 和 Prettier 进行代码质量控制：

```bash
# 检查代码
npm run lint

# 格式化代码
npm run format
```

### 测试

```bash
# 运行测试
npm run test
```

## 📦 部署

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# 将 dist/ 目录部署到 Netlify
```

## 🤝 贡献

欢迎提交 Pull Request 或创建 Issue！

## 📄 许可证

MIT

## 🙏 致谢

- [和风天气](https://www.qweather.com/) - 提供天气数据 API
- [Framer Motion](https://www.framer.com/motion/) - 强大的动画库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

---

**注意**: 请妥善保管您的 API Key，不要将其提交到版本控制系统。
