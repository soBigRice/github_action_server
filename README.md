# GitHub 信息服务

一个基于 Node.js 的轻量服务，用于获取 GitHub 用户和仓库的公开信息，支持通过 `.env` 配置访问令牌与 API 参数。

## 功能
- 获取用户公开信息
- 获取用户公开仓库列表（支持分页与排序）
- 获取指定仓库信息
- 健康检查接口

## 快速开始
1. 安装依赖
```bash
npm install
```

2. 配置环境变量
```bash
cp .env.example .env
```

3. 启动服务
```bash
npm start
```

默认服务地址：`http://localhost:3000`

## 环境变量
```env
PORT=3000
GITHUB_TOKEN=
GITHUB_API_BASE=https://api.github.com
GITHUB_USER_AGENT=github_action_server
GITHUB_API_VERSION=2022-11-28
```

## 接口文档
详细接口说明见 `API.md`。

## 目录说明
- `index.js` 服务入口
- `.env.example` 环境变量示例
- `API.md` 接口文档
