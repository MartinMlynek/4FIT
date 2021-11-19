import { React, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../store/UserContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import classes from "./Form.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const Form = (props) => {
  const navigate = useNavigate();
  const passRef = useRef("");
  const userRef = useRef("");
  const userCtx = useContext(UserContext);
  const loginHandler = (event) => {
    event.preventDefault();
    const username = userRef.current.value;
    const password = passRef.current.value;
    if (
      !usernameHasError &&
      !passwordHasError &&
      username.length !== 0 &&
      password.length !== 0
    ) {
      setMessage("");
      if (props.isLogin) {
        sendAuth(username, password);
      } else {
        register(username, password);
      }
      passRef.current.value = "";
    } else {
      setMessage(
        props.isLogin
          ? "Nepodařilo se přihlásit"
          : "Nepodařilo se zaregistrovat"
      );
    }
  };

  async function register(username, password) {
    try {
      const response = await userCtx.client.post(
        "/register/",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/login", { replace: true });
    } catch (err) {
      setMessage("Nepodařilo se zaregistrovat");
    }
  }

  async function sendAuth(username, password) {
    try {
      const response = await userCtx.client.post(
        "/login/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: username,
            password: password,
          },
        }
      );
      const user = await response.data;
      userCtx.login(user);
      console.log("USER:");
      console.log(user);
      navigate("/", { replace: true });
    } catch (error) {
      setMessage("Nepodařilo se přihlásit");
    }
  }

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
  const [message, setMessage] = useState("");
  const usernameClasses = usernameHasError
    ? "form-control invalid"
    : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const text = props.isLogin ? "Login" : "Register";
  return (
    <section className={classes.box}>
      <Card className={classes.card}>
        <h1 className={classes.title} textAlign="center ">
          {text}
        </h1>
        <form onSubmit={loginHandler}>
          <div className="control-group">
            <p>{message}</p>
            <div className={usernameClasses}>
              <label htmlFor="username">Username:</label>
              <input
                ref={userRef}
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
