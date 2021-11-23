import React from "react";
import { useParams } from "react-router";
import { useContext } from "react/cjs/react.development";
import UserContext from "../store/UserContext";
import { Navigate } from "react-router-dom";
import GrouppedPost from "./Post/GrouppedPost";
import classes from "./Post/PostList.module.css";
const DetailPost = (props) => {
  const params = useParams();
  const userCtx = useContext(UserContext);

  if (userCtx.posts.length === 0) {
    userCtx.getPosts();
  }

  const post = userCtx.posts.find((post) => {
    console.log(params.id);
    return post.id === parseInt(params.id);
  });
  return userCtx.posts.length !== 0 ? (
    <section className={classes.posts}>
      <h1>Post no. {post.id}</h1>
      <ul>
        <GrouppedPost post={post} />
      </ul>
    </section>
  ) : (
    <h1>Loading</h1>
  );
};

export default DetailPost;
