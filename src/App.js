import PostList from "./components/Post/PostList";
import Layout from "./Layout";
import { React } from "react";
import classes from "./App.module.css";
import Navigations from "./components/UI/Navigation/Navigations";
import UserProvider from "./store/UserProvider";
import { Route, BrowserRouter, Redirect, Routes } from "react-router-dom";
import Login from "./components/Comments/Login";
import Register from "./components/Comments/Register";
import Admin from "./components/UI/Admin/Admin";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout isMain={true}>
              <PostList />
            </Layout>
          }
          exact
        ></Route>

        <Route
          path="/subcategory/:id"
          exact
          element={
            <Layout isMain={true}>
              <PostList />
            </Layout>
          }
        />

        <Route
          path="/login"
          exact
          element={
            <Layout isAuth={true}>
              <Login />
            </Layout>
          }
        ></Route>
        <Route
          path="/register"
          exact
          element={
            <Layout isAuth={true}>
              <Register></Register>
            </Layout>
          }
        />

        <Route
          path={"/admin"}
          exact
          element={
            <Layout isAdmin={true}>
              <Admin />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
