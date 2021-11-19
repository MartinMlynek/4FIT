import React from "react";
import Post from "../Post/Post";
import Card from "../UI/Card";

const Comment = (props) => {
  return <Post {...props} notRow={true} />;
};

export default Comment;
