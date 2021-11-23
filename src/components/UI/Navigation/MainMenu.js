import { React, useEffect, useState } from "react";

import classes from "./MainMenu.module.css";
import NavItem from "./NavItem";
import axios from "axios";
const url = "http://localhost:5000";

const client = axios.create({
  baseURL: url,
});

const MainMenu = (props) => {
  const color = props.isSecond ? "superLightGreen" : "green";

  let categoryList;
  console.log("NAV");
  console.log("AAAAAA");
  console.log(props.categories);
  console.log(props.categories.length);
  if (props.categories.length > 0) {
    if (!props.isSecond) {
      categoryList = props.categories.map((category) => {
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
      categoryList = props.categories.map((category) => {
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
