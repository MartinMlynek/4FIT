import axios from "axios";
import { useReducer } from "react";

import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:5000";

const client = axios.create({
  baseURL: url,
  headers: { "Content-Type": "multipart/form-data" },
});

const defaultUserState = {
  posts: [],
  client: client,
  subCategory: "1",
  category: "2",
  user: null,
  token: "",
};

function userReducer(state, action) {
  if (action.type === "UPDATE_POST") {
    return {
      ...state,
      posts: action.posts,
    };
  } else if (action.type === "UPDATE_SUBCATEGORY") {
    return {
      ...state,
      subCategory: action.subCategory,
    };
  } else if (action.type === "LOGIN") {
    return {
      ...state,
      user: action.user.user,
      token: action.user.token,
    };
  } else if (action.type == "UPDATE_CATEGORY") {
    return {
      ...state,
      category: action.category,
    };
  }
  return defaultUserState;
}

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  async function getPostsHandler() {
    let posts = [];
    const response = await userState.client.get("/");
    posts = await response.data;
    dispatchUserAction({ type: "UPDATE_POST", posts: posts });
  }

  const subCategoryHandler = (subCategory) => {
    dispatchUserAction({
      type: "UPDATE_SUBCATEGORY",
      subCategory: subCategory,
    });
  };

  const categoryHandler = (category) => {
    dispatchUserAction({
      type: "UPDATE_CATEGORY",
      category: category,
    });
  };

  const loginHandler = (user) => {
    dispatchUserAction({ type: "LOGIN", user: user });
  };

  console.log("SDasda");
  console.log(userState);
  const postContext = {
    posts: userState.posts,
    subCategory: userState.subCategory,
    category: userState.category,
    token: userState.token,
    client: userState.client,
    user: userState.user,
    getPosts: getPostsHandler,
    setSubCategory: subCategoryHandler,
    login: loginHandler,
    setCategory: categoryHandler,
  };

  return (
    <UserContext.Provider value={postContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
