import React from "react";
import Favourite from "../components/Favourite";

const UserContext = React.createContext({
  posts: [],
  subCategory: "1",
  category: "1",
  token: null,
  user: null,
  search: "",
  getPosts: () => {},
  setSubCategory: (subCategory) => {},
  setCategory: (category) => {},
  setFavourite: (Favourites) => {},
  setSearch: (search) => {},
  login: (user) => {},
  client: null,
});

export default UserContext;
