import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../store/UserContext";

const Admin = () => {
  const userCtx = useContext(UserContext);
  const [users, setUsers] = useState([]);
  async function getUsers() {
    const response = await userCtx.client.get("/users/", {
      headers: { "x-access-token": userCtx.token },
    });
    console.log(response.data);
    setUsers(response.data);
  }

  async function removeHandler(id) {
    const response = await userCtx.client.delete("/users/" + id, {
      headers: {
        "x-access-token": userCtx.token,
        "Content-Type": "application/json",
      },
    });

    getUsers();
  }
  useEffect(() => {
    getUsers();
  }, []);

  const userList = users.map((user) => {
    const edit = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil-square"
        viewBox="0 0 16 16"
      >
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
        <path
          fill-rule="evenodd"
          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
        />
      </svg>
    );
    const trash = (id) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        onClick={() => {
          removeHandler(id);
        }}
        fill="currentColor"
        class="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
    );
    return (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.role.name}</td>
        <td>
          <Link to={"/aposts/" + user.id}>posts</Link>
        </td>
        <td>
          <Link to={"/acomments/" + user.id}>comments</Link>
        </td>
        <td>
          <Link to={"/afavposts/" + user.id}>fav posts</Link>
        </td>
        <td>
          <Link to={"/editUser"}>{edit}</Link>
        </td>
        <td>{trash(user.id)}</td>
      </tr>
    );
  });
  return (
    <>
      <table>
        <h1>Users</h1>
        <tr>
          <th>username</th>
          <th>role</th>
          <th>posts</th>
          <th>comments</th>
          <th>fav posts</th>
          <th>edit</th>
          <th>remove </th>
        </tr>
        <tbody>{userList}</tbody>
      </table>
    </>
  );
};

export default Admin;
