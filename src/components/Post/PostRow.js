import { React, useState } from "react";
import Post from "./Post";
import { Link } from "react-router-dom";
import classes from "./PostRow.module.css";
const PostRow = (props) => {
  const showHandler = () => {
    setShowDetail(true);
  };

  const hideHandler = () => {
    setShowDetail(false);
  };
  const carretDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={classes.carret}
      viewBox="0 0 16 16"
      onClick={hideHandler}
    >
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );
  const carretLeft = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={classes.carret}
      viewBox="0 0 16 16"
      onClick={showHandler}
    >
      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
    </svg>
  );
  const [showDetail, setShowDetail] = useState(false);
  const post = <Post {...props.post} />;
  const date = new Date(props.post.createdAt);
  const formated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return (
    <>
      <tr>
        <td>{props.post.id}</td>
        <td>{formated}</td>
        <td>{props.post.subCategory.name}</td>
        <td>{showDetail ? carretDown : carretLeft}</td>
        <td>
          <Link to={"/detail/" + props.post.id}>Detail</Link>
        </td>
      </tr>
      <tr>{showDetail && <td colspan="5">{post}</td>}</tr>
    </>
  );
};

export default PostRow;
