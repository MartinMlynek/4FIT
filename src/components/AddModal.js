import React, { useContext } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Button from "./UI/Button";
import Card from "./UI/Card";
import axios from "axios";
import { file } from "@babel/types";
import UserContext from "../store/UserContext";
import Backdrop from "./Backdrop";
const url = "http://localhost:5000";

const ModalOverlay = (props) => {
  const textInput = React.useRef("");
  const fileInput = React.useRef(null);
  const userCtx = useContext(UserContext);
  async function addPost(data) {
    const response = await userCtx.client.post("/", data);
    userCtx.getPosts();
  }
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("ude");
    const content = textInput.current.value;
    const file = fileInput.current.files[0];
    console.log(props.subCategory);
    const data = new FormData();
    data.append("content", content);
    if (file) {
      data.append("file", file);
      console.log("here");
    }
    data.append("subCategoryId", props.subCategory);
    addPost(data);
    props.onConfirm();
  };

  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <span>{props.title}</span>
        <span class={classes.cross} onClick={props.onConfirm}>
          X
        </span>
      </header>
      <form onSubmit={submitHandler}>
        <div className={classes.content}>
          <input ref={fileInput} type="file" name="file" />
          <label htmlFor="content">Content:</label>
          <textarea
            ref={textInput}
            id="content"
            name="content"
            rows="15"
            cols="50"
          />
        </div>
        <footer className={classes.actions}>
          <Button type="submit" className={classes.button}>
            Add post
          </Button>
        </footer>
      </form>
    </Card>
  );
};

const AddModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          subCategory={props.subCategory}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AddModal;
