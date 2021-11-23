import axios from "axios";
import { React, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../store/UserContext";
import ImageModal from "../ImageModal";
import Button from "../UI/Button";
import classes from "./Post.module.css";

const Post = (props) => {
  const navigate = useNavigate();
  const markFill = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-bookmark-fill"
      viewBox="0 0 16 16"
      onClick={removeFavouriteHandler}
    >
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
    </svg>
  );
  const replyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-reply-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z" />
    </svg>
  );
  const newPage = (post) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-box-arrow-in-up-right"
      viewBox="0 0 16 16"
      onClick={() => {
        navigateToDetail(post);
      }}
    >
      <path
        fill-rule="evenodd"
        d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"
      />
      <path
        fill-rule="evenodd"
        d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"
      />
    </svg>
  );

  const mark = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-bookmark"
      viewBox="0 0 16 16"
      font-weight="bold"
      onClick={addFavouriteHandler}
    >
      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
    </svg>
  );

  const dots = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-three-dots"
      viewBox="0 0 16 16"
    >
      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  );

  const url = "http://127.0.0.1:5000";
  const userCtx = useContext(UserContext);
  let isMarked;
  if (userCtx.user !== null) {
    console.log("ISMARKED");
    isMarked =
      userCtx.user.favourites.find((post) => {
        return props.id === post.id;
      }) !== undefined;
    console.log(isMarked);
  } else {
    isMarked = false;
  }

  async function removeFavouriteHandler() {
    const response = await userCtx.client.delete(
      "/favourites/" + userCtx.user.id,
      {
        data: {
          id: props.id,
        },
        headers: {
          "x-access-token": userCtx.token,
          "Content-Type": "application/json",
        },
      }
    );

    userCtx.setFavourite(response.data);
    console.log(userCtx.user);
  }

  async function addFavouriteHandler() {
    if (userCtx.user !== null) {
      const response = await userCtx.client.post(
        "/favourites/" + userCtx.user.id,
        {
          id: props.id,
        },
        {
          headers: {
            "x-access-token": userCtx.token,
            "Content-Type": "application/json",
          },
        }
      );

      userCtx.setFavourite(response.data);
      console.log(userCtx.user);
    }
  }

  const navigateToDetail = (post) => {
    navigate("/detail/" + post, { replace: false });
  };
  const client = axios.create({
    baseURL: url,
    headers: { "Content-Type": "multipart/form-data" },
  });
  const textInput = useRef("");
  const fileInput = useRef("");
  const date = new Date(props.createdAt);
  const formated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  const [showImage, setShowImage] = useState(false);
  const [replying, setReplying] = useState(false);
  let val;
  const postId = !props.notRow ? props.id : props.post;
  let buttonText = replying ? "Close" : "Reply";
  const replyHandler = () => {
    setReplying(!replying);
  };

  async function addReply(data) {
    const response = await client.post("/comments/" + postId, data);
    userCtx.getPosts();
  }

  const showImageHandler = () => {
    setShowImage(true);
  };

  const hideImgaeHandler = () => {
    setShowImage(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const content = textInput.current.value;
    const file = fileInput.current.files[0];
    console.log(props.subCategory);
    const data = new FormData();
    data.append("content", content);
    if (file) {
      data.append("file", file);
      console.log("here");
    }
    addReply(data);
    replyHandler();
  };

  const value = !props.notRow ? "post@" + props.id : "comment@" + props.id;
  const replyBox = (
    <form onSubmit={submitHandler}>
      <div className={classes.formBox}>
        <textarea
          ref={textInput}
          id="content"
          name="content"
          rows="5"
          cols="50"
        >
          {value}
        </textarea>
        <div className={classes.formRow}>
          <input type="file" ref={fileInput} />
          <Button className={classes.buttonComment} type="submit">
            Add commnet
          </Button>
        </div>
      </div>
    </form>
  );
  return (
    <>
      {showImage && (
        <ImageModal
          img={url + "/images/" + props.filename}
          alt={props.filename}
          onClick={hideImgaeHandler}
        />
      )}
      <div className={classes.container}>
        <div className={classes.box}>
          {props.filename && (
            <img
              src={url + "/images/" + props.filename}
              alt={props.filename}
              onClick={showImageHandler}
            />
          )}
        </div>
        <p className={classes.content}>{props.content}</p>
        {!props.notRow && (
          <div className={classes.icons}>
            {newPage(props.id)}
            {isMarked ? markFill : mark}
            {dots}
          </div>
        )}
      </div>
      <div
        className={`${!props.notRow && classes.line} ${classes.dateReplyBox}`}
      >
        <span className={classes.date}>{formated}</span>
        <button onClick={replyHandler} className={classes.button}>
          {!replying && replyIcon}
          {buttonText}
        </button>
      </div>
      {replying && replyBox}
    </>
  );
};

export default Post;
