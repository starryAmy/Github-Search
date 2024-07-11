import axios from "axios";

const github = axios.create({ baseURL: process.env.REACT_APP_GITHUB_URL });

// search users from GitHub API
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });
  const res = await github.get(`/search/users?${params}`);
  return res.data.items;
};

//get user and repo all at once
export const getUserAndRepos = async (login) => {
  const params = new URLSearchParams({ per_page: 10 });
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?${params}`),
  ]);
  return { user: user.data, repos: repos.data };
};
