import { React, useEffect, useState } from "react";

import classes from "./MainMenu.module.css";
import NavItem from "./NavItem";
import axios from "axios";
const url = "http://127.0.0.1:5000";

const client = axios.create({
  baseURL: url,
});

const MainMenu = (props) => {
  const color = props.isSecond ? "superLightGreen" : "green";
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    const response = await client.get(props.subUrl);
    setCategories(response.data);
  }

  useEffect(() => {
    getCategories();
  }, [props.subUrl]);

  let categoryList;
  if (!props.isSecond) {
    categoryList = categories.map((category) => {
      return (
        <NavItem
          key={category.id}
          id={category.id}
          text={category.name}
          color="green"
          updateCategoryFunc={props.updateCategoryFunc}
          isSecond={props.isSecond}
        />
      );
    });
  } else {
    categoryList = categories.map((category) => {
      return (
        <NavItem
          key={category.id}
          id={category.id}
          text={category.name}
          color="green"
          link={"/subcategory/" + category.id}
          isSecond={props.isSecond}
        />
      );
    });
  }
  return (
    <div className={classes.box}>
      {!props.isSecond && (
        <NavItem text="Archive" color="lightGreen" link={"/favourites"} />
      )}
      {categoryList}
    </div>
  );
};

export default MainMenu;
