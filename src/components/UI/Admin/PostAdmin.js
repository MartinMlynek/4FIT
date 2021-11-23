import PostTable from "../../Post/PostTable";
import PostRow from "../../Post/PostRow";
import { useContext } from "react";
import UserContext from "../../../store/UserContext";
const PostAdmin = () => {
  const userCtx = useContext(UserContext);

  const postList = userCtx.posts.map((post) => {
    return <PostRow post={post} />;
  });
  return <PostTable title={"All posts"}>{postList}</PostTable>;
};

export default PostAdmin;
