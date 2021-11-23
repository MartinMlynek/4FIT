import { React, useEffect, useState, useContext } from "react";
import Card from "../UI/Card";
import classes from "./PostList.module.css";
import axios from "axios";
import MainPost from "./MainPost";
import UserContext from "../../store/UserContext";
import Button from "../UI/Button";
import GrouppedPost from "./GrouppedPost";
import { useParams } from "react-router";

const url = "http://127.0.0.1:5000";

const client = axios.create({
  baseURL: url,
});

const PostList = (props) => {
  const userCtx = useContext(UserContext);
  const params = useParams();
  userCtx.subCategory = params.id;

  console.log("qqqqq");
  console.log(params);
  const postList = userCtx.posts
    .filter((post) => {
      if (post !== null) {
        console.log("ER");
        console.log(userCtx.search);
        console.log(post.content.includes(userCtx.search));
        const contains = post.comments.filter((cmt) => {
          console.log("CMT");
          console.log(cmt);
          return cmt.content.includes(userCtx.search);
        });
        return (
          post.subCategory.id === parseInt(params.id) &&
          (post.content.includes(userCtx.search) || contains.length > 0)
        );
      }
    })
    .map((post) => <GrouppedPost post={post} url={url} />);

  return (
    <section className={classes.posts}>
      <ul>{postList}</ul>
    </section>
  );
};

export default PostList;
