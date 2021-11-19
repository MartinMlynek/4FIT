import React from "react";

const UserContext = React.createContext({
  posts: [],
  subCategory: "1",
  category: "1",
  token: null,
  user: null,
  getPosts: () => {},
  setSubCategory: (subCategory) => {},
  setCategory: (category) => {},
  login: (user) => {},
});

export default UserContext;
