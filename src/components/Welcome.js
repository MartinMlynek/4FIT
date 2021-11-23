import { useContext } from "react";
import UserContext from "../store/UserContext";
import logo from "../svg/icon.png";
import Post from "./Post/Post";
import Card from "./UI/Card";
import classes from "./Welcome.module.css";
const Welcome = () => {
  const userCtx = useContext(UserContext);
  let sortedMin = [];
  if (userCtx.posts.length > 0) {
    const sorted = userCtx.posts.sort((firstEl, secondEl) => {
      return firstEl.comments.length > secondEl.comments.length ? -1 : 1;
    });
    console.log("sort");
    console.log(sorted);

    sortedMin = sorted.filter((element, index) => {
      return index < 5;
    });
  }

  const sortedList = sortedMin.map((post) => {
    return (
      <Card className={classes.popularThread}>
        <div>
          <h2 className={classes.subCategory}>{post.subCategory.name}</h2>
          <Post {...post} />
        </div>
      </Card>
    );
  });

  return (
    <div className={classes.welcomeBox}>
      <div className={classes.logoBox}>
        <img src={logo} className={classes.logo} alt="4fit" />
        <span> 4FIT</span>
      </div>
      <h2 className={classes.subtitle}>
        Welcome on best imageboard in the world!
      </h2>
      <Card className={classes.cardBorder}>
        <h1>What is 4FIT?</h1>
        <p>
          4FIT is a simple image-based bulletin board where anyone can post
          comments and share images. There are boards dedicated to a variety of
          topics, from Japanese animation and culture to videogames, music, and
          photography. Users do not need to register an account before
          participating in the community. Feel free to click on a board below
          that interests you and jump right in! Be sure to familiarize yourself
          with the Rules before posting, and read the FAQ if you wish to learn
          more about how to use the site.
        </p>
      </Card>
      <Card className={classes.popular}>
        <h1>Popular threads</h1>
        {sortedList}
      </Card>
    </div>
  );
};

export default Welcome;
