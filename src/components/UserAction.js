// search users from GitHub API
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });
  const res = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`
    // {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // }
  );
  //response from the fetch request is an object with a json method. So we use {items} to destructure the object.
  const { items } = await res.json();
  return items;
};

//get single user
export const getUser = async (login) => {
  const res = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/users/${login}`
    // {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // }
  );
  // response is just a single object so we don't need to destructure it
  if (res.status === 404) {
    //if there is an error, redirect to the not found page
    window.location("/notfound");
    return;
  } else {
    const data = await res.json();
    return data;
  }
};

//get user repos
export const getRepos = async (login) => {
  //增加搜索参数
  const params = new URLSearchParams({ sort: "created", per_page: 10 });
  const res = await fetch(
    `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`
    // {
    //   headers: {
    //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
    // }
  );
  // response is just a single object so we don't need to destructure it
  if (res.status === 404) {
    //if there is an error, redirect to the not found page
    window.location("/notfound");
    return;
  } else {
    const data = await res.json();
    return data;
  }
};
