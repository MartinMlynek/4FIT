import { React, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Form.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const Form = (props) => {
  const passRef = useRef("");
  const userRef = useRef("");
  const formHandler = (event) => {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passRef.current.value;
    if (
      !usernameHasError &&
      !passwordHasError &&
      username.length !== 0 &&
      password.length !== 0
    ) {
      props.setMessage("");
      props.onClick(username, password);

      passRef.current.value = "";
    } else {
      props.setMessage(`Unavalbile to ${props.tile.lower()}`);
    }
  };

  const usernameValidHandler = () => {
    const username = userRef.current.value;
    if (!isNotEmpty(username)) {
      setUsernameHasError(true);
    } else {
      setUsernameHasError(false);
    }
  };

  const passwordValidHandler = () => {
    const password = passRef.current.value;
    if (!isNotEmpty(password)) {
      setPasswordHasError(true);
    } else {
      setPasswordHasError(false);
    }
  };

  const [usernameHasError, setUsernameHasError] = useState(false);
  const [passwordHasError, setPasswordHasError] = useState(false);
  const usernameClasses = usernameHasError
    ? "form-control invalid"
    : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const text = props.title;
  return (
    <section className={classes.box}>
      <Card className={classes.card}>
        <h1 className={classes.title} textAlign="center ">
          {text}
        </h1>
        <form onSubmit={formHandler}>
          <div className="control-group">
            <p>{props.message}</p>
            <div className={usernameClasses}>
              <label htmlFor="username">Username:</label>
              <input
                ref={userRef}
                defaultValue={props.userValue}
                type="text"
                id="username"
                onBlur={usernameValidHandler}
                onChange={usernameValidHandler}
              />
              {usernameHasError && (
                <p className="error-text">Username must not be empty.</p>
              )}
            </div>
            <div className={passwordClasses}>
              <label htmlFor="password">Password:</label>
              <input
                onBlur={passwordValidHandler}
                onChange={passwordValidHandler}
                ref={passRef}
                type="password"
                id="password"
              />
              {passwordHasError && (
                <p className="error-text">Password must not be empty.</p>
              )}
            </div>
            <div className="form-actions">
              <Button type="submit">{text}</Button>
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default Form;
