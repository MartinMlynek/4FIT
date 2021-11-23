import Form from "./Form";
import UserContext from "../../store/UserContext";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
const Register = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      setError("Nepodařilo se zaregistrovat");
    }
  }
  return (
    <Form
      title="Register"
      onClick={register}
      setMessage={setError}
      message={error}
    />
  );
};

export default Register;
