const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const GITHUB_API_BASE = process.env.GITHUB_API_BASE || 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_USER_AGENT = process.env.GITHUB_USER_AGENT || 'github_action_server';
const GITHUB_API_VERSION = process.env.GITHUB_API_VERSION || '2022-11-28';

const githubClient = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10_000,
  headers: {
    Accept: 'application/vnd.github+json',
    'User-Agent': GITHUB_USER_AGENT,
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  },
});

// GET /health
// 健康检查，返回服务运行状态
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// GET /github/users/:username
// 获取指定用户的 GitHub 公开信息
app.get('/github/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await githubClient.get(`/users/${encodeURIComponent(username)}`);
    res.status(response.status).json(response.data);
  } catch (err) {
    handleGithubError(err, res);
  }
});

// GET /github/users/:username/repos
// 获取指定用户的公开仓库列表，支持分页与排序
app.get('/github/users/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const { page, per_page, sort, direction } = req.query;

    const response = await githubClient.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: {
        page,
        per_page,
        sort,
        direction,
      },
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    handleGithubError(err, res);
  }
});

// GET /github/repos/:owner/:repo
// 获取指定仓库信息
app.get('/github/repos/:owner/:repo', async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const response = await githubClient.get(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`
    );
    res.status(response.status).json(response.data);
  } catch (err) {
    handleGithubError(err, res);
  }
});

function handleGithubError(err, res) {
  if (err.response) {
    res
      .status(err.response.status)
      .json({ message: err.response.data?.message || 'GitHub API error' });
    return;
  }

  if (err.code === 'ECONNABORTED') {
    res.status(504).json({ message: 'GitHub API timeout' });
    return;
  }

  res.status(500).json({ message: 'Server error' });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
