import React, { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import UserContext from "../store/UserContext";

import classes from "./Favourite.module.css";
import PostRow from "./Post/PostRow";
import PostTable from "./Post/PostTable";
const Favourite = () => {
  const userCtx = useContext(UserContext);
  const [favouritePosts, setFavouritesPosts] = useState([]);
  console.log(userCtx.user);
  let favList = [];

  if (userCtx.user !== null) {
    favList = userCtx.user.favourites.map((post) => {
      console.log("FAV");
      console.log(post);
      return <PostRow post={post} />;
    });
  }

  return <PostTable title={"Favourite posts"}>{favList}</PostTable>;
};

export default Favourite;
