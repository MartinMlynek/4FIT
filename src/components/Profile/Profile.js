import { useState } from "react";
import { useContext, useEffect } from "react/cjs/react.development";
import Cookies from "universal-cookie/es6";
import UserContext from "../../store/UserContext";
import Form from "../Auth/Form";

const Profile = (props) => {
  const cookies = new Cookies();
  const userCtx = useContext(UserContext);
  const [error, setError] = useState("");

  const userValue = userCtx.user !== null ? userCtx.user.username : "";

  async function sendEdit(username, password) {
    let user = {
      username: username,
    };
    if (password !== undefined) user["password"] = password;
    try {
      const response = await userCtx.client.put(
        "/users/" + userCtx.user.id,
        user,
        {
          headers: {
            "x-access-token": userCtx.token,
            "Content-Type": "application/json",
          },
        }
      );

      const cookieU = cookies.get("user");
      cookieU.user = response.data;
      console.log("EDIT");
      console.log(response.data);
      cookies.set("user", cookieU, { path: "/" });
    } catch (err) {
      setError("Nepodařilo se zeditovat");
    }
  }

  return (
    <>
      <Form
        title="Edit self"
        onClick={sendEdit}
        setMessage={setError}
        message={error}
        userValue={userValue}
      />
    </>
  );
};

export default Profile;
