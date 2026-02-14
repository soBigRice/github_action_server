# GitHub 信息服务 API

**Base URL**
- `http://localhost:3000`

**认证说明**
- 若配置了 `GITHUB_TOKEN`，会以 Token 方式访问 GitHub API，提升请求配额。

**通用错误响应**
```json
{ "message": "GitHub API error" }
```

**GET /health**
说明：健康检查，返回服务运行状态。  
响应示例：
```json
{ "ok": true }
```

**GET /github/users/:username**
说明：获取指定用户的 GitHub 公开信息。  
路径参数：
- `username` GitHub 用户名

响应说明：
- 透传 GitHub `/users/{username}` 接口的响应数据。

示例：
```bash
curl "http://localhost:3000/github/users/octocat"
```

**GET /github/users/:username/repos**
说明：获取指定用户的公开仓库列表，支持分页与排序。  
路径参数：
- `username` GitHub 用户名

查询参数（可选）：
- `page` 页码
- `per_page` 每页数量
- `sort` 排序字段（如 `created`、`updated`、`pushed`、`full_name`）
- `direction` 排序方向（`asc` 或 `desc`）

响应说明：
- 透传 GitHub `/users/{username}/repos` 接口的响应数据。

示例：
```bash
curl "http://localhost:3000/github/users/octocat/repos?per_page=5&sort=updated"
```

**GET /github/repos/:owner/:repo**
说明：获取指定仓库信息。  
路径参数：
- `owner` 仓库所属用户或组织
- `repo` 仓库名称

响应说明：
- 透传 GitHub `/repos/{owner}/{repo}` 接口的响应数据。

示例：
```bash
curl "http://localhost:3000/github/repos/octocat/Hello-World"
```
