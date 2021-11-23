import PostList from "./components/Post/PostList";
import Layout from "./Layout";
import { React, useContext, useEffect } from "react";
import classes from "./App.module.css";
import Navigations from "./components/UI/Navigation/Navigations";
import UserProvider from "./store/UserProvider";
import { Route, BrowserRouter, Redirect, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Admin from "./components/UI/Admin/Admin";
import Favourite from "./components/Favourite";
import DetailPost from "./components/DetailPost";
import PostAdmin from "./components/UI/Admin/PostAdmin";
import CategoryAdmin from "./components/UI/Admin/CategoryAdmin";
import Cookies from "universal-cookie/es6";
import Profile from "./components/Profile/Profile";
import Welcome from "./components/Welcome";
const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isMain={true}>
                <Welcome />
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

          <Route
            path={"/admin/posts"}
            exact
            element={
              <Layout isAdmin={true}>
                <PostAdmin />
              </Layout>
            }
          />

          <Route
            path={"/admin/categories"}
            exact
            element={
              <Layout isAdmin={true}>
                <CategoryAdmin isCategory={true} />
              </Layout>
            }
          />
          <Route
            path={"/admin/subcategories/:id"}
            exact
            element={
              <Layout isAdmin={true}>
                <CategoryAdmin isCategory={false} />
              </Layout>
            }
          />
          <Route
            path={"/favourites"}
            exact
            element={
              <Layout isMain={true}>
                <Favourite />
              </Layout>
            }
          />
          <Route
            exact
            path="/detail/:id"
            element={
              <Layout isMain={true}>
                <DetailPost />
              </Layout>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <Layout isMain={true}>
                <Profile />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
