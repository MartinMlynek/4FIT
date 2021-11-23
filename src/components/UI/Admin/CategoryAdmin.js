import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../../store/UserContext";
import Button from "../Button";
import classes from "./CategoryAdmin.module.css";
import { useParams } from "react-router";
const CategoryTable = (props) => {
  return (
    <table>
      <h1>{props.title}</h1>
      <tr>
        <th>Name</th>
        <th>Edit</th>
        <th>Remove</th>
        {props.isCategory && <th>Subcategories</th>}
      </tr>
      <tbody>{props.children}</tbody>
    </table>
  );
};

const CategoryAdmin = (props) => {
  const userCtx = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const nameRef = useRef("");
  const params = useParams();
  const url = props.isCategory
    ? "/categories/"
    : "/subcategories/" + parseInt(params.id);
  async function getCategory() {
    try {
      const response = await userCtx.client.get(url);
      if (!("message" in response.data)) setCategories(response.data);
      console.log("CATE");
      console.log(response.data);
    } catch (er) {
      console.log("CAT2E");

      setCategories([]);
    }
  }
  console.log(categories);

  useEffect(() => {
    setCategories([]);
    getCategory();
  }, [params.id]);

  const categoryList = categories.map((cat) => {
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
    const remove = (id) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        onClick={() => {
          deleteCategoryHandler(id);
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
      <tr key={cat.id}>
        <td>{cat.name}</td>
        <td>{edit}</td>
        <td>{remove(cat.id)}</td>
        {props.isCategory && (
          <td>
            <Link to={"/admin/subcategories/" + cat.id}>Show</Link>
          </td>
        )}
      </tr>
    );
  });
  async function deleteCategoryHandler(id) {
    const response = await userCtx.client.delete(url, {
      data: {
        id: id,
      },
      headers: {
        "x-access-token": userCtx.token,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    getCategory();
  }
  async function addCategoryHandler(event) {
    event.preventDefault();
    const name = nameRef.current.value;
    const category = props.isCategory
      ? {
          name: name,
        }
      : {
          name: name,
          categoryId: params.id,
        };
    if (name.length > 0) {
      const response = await userCtx.client.post(url, category, {
        headers: {
          "x-access-token": userCtx.token,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      nameRef.current.value = "";
      getCategory();
    }
  }

  const addText = props.isCategory ? "category" : "subcategory";
  const title = props.isCategory ? "Categories" : "Subcategories";
  return (
    <div>
      <CategoryTable isCategory={props.isCategory} title={title}>
        {categoryList}
      </CategoryTable>
      <div>
        <h1>Add {addText}</h1>
        <form onSubmit={addCategoryHandler}>
          <div className={`form-control-row ${classes.rowBox}`}>
            <div className="form-group">
              <label htmlFor="name" className={classes.label}>
                Name
              </label>
              <input ref={nameRef} type="text" placeholder="insert name..." />
            </div>

            <div className="form-actions">
              <Button type="submit" className={classes.button}>
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryAdmin;
