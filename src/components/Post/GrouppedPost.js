import { React, useState } from "react";
import classes from "./PostList.module.css";
import Card from "../UI/Card";
import MainPost from "./MainPost";
const GrouppedPost = (props) => {
  const post = props.post;
  const [showComments, setShowCommnets] = useState(false);
  const commentLength = post.comments.length;
  const isLesserThan = commentLength < 4;

  const textComment = isLesserThan
    ? "No more comments"
    : `Show more comments ${commentLength - 4}`;
  const commentsHandler = () => {
    setShowCommnets((state) => {
      return !state;
    });
  };

  return (
    <Card key={post.id} className={classes.post}>
      <MainPost
        {...post}
        url={props.url}
        postCard={classes.post}
        showComments={showComments}
      />
      <div className={classes.container}>
        <button className={classes["show-comments"]} onClick={commentsHandler}>
          {textComment}
        </button>
      </div>
    </Card>
  );
};

export default GrouppedPost;
