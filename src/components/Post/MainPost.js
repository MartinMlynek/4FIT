import Post from "./Post";
import Card from "../UI/Card";
import Comment from "../Comments/Comment";
import classes from "./MainPost.module.css";
import { React } from "react";
const MainPost = (props) => {
  const length = props.comments.length;

  const comments = props.comments.map((cmt) => (
    <Card key={cmt.id} className={`${props.postCard} ${classes.comment}`}>
      <Comment
        id={cmt.id}
        content={cmt.content}
        createdAt={cmt.createdAt}
        filename={cmt.filename}
        url={props.url}
        post={props.id}
      />
    </Card>
  ));

  const minComments = comments.filter((element, index) => {
    return index < 4;
  });

  return (
    <li className={classes.post}>
      <Post {...props} />
      {props.showComments && comments}
      {!props.showComments && minComments}
    </li>
  );
};

export default MainPost;
