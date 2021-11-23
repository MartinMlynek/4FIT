import Form from "./Form";
import UserContext from "../../store/UserContext";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import Cookies from "universal-cookie/es6";
const Login = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const cookies = new Cookies();

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
      cookies.set("user", user, { path: "/" });
      navigate("/", { replace: true });
    } catch (error) {
      setError("Unaavalible to se přihlásit");
    }
  }

  return (
    <Form
      title="Login"
      onClick={sendAuth}
      setMessage={setError}
      message={error}
    />
  );
};

export default Login;
