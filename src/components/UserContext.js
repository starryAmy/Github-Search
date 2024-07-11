import { createContext, useReducer } from "react";
import userReducer from "./UserReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    //get single user
    user: {},
    repos: [],
  };
  //empty array is going to destructuring the array
  const [state, dispatch] = useReducer(userReducer, initialState);

  // search users from GitHub API
  const searchUsers = async (text) => {
    setLoading();
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
    //dispatch actions to the reducer
    dispatch({ type: "FETCH_USERS", payload: items });
  };

  //get single user
  const getUser = async (login) => {
    setLoading();
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
      //dispatch actions to the reducer
      dispatch({ type: "GET_USER", payload: data });
    }
  };

  //get user repos
  const getRepos = async (login) => {
    setLoading();
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
      //dispatch actions to the reducer
      dispatch({ type: "GET_REPOS", payload: data });
    }
  };

  //clear users
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };
  //we will prob need to set loading to true for multiple times so wrap that into a function
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <UserContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
