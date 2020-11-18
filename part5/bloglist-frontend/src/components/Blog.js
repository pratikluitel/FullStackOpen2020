import React, { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ name, blog, toggleRefetch }) => {
  const [toggleDetails, setToggleDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const disp = { display: toggleDetails ? "" : "none" };

  const showAll = () => {
    setToggleDetails(!toggleDetails);
  };

  const handleLike = async () => {
    const info = {
      user: blog.user ? blog.user.id : undefined,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
    };
    const id = blog.id;
    await blogService.edit(info, id);
    toggleRefetch();
  };

  const handleRemove = async () => {
    const id = blog.id;
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(id);
      toggleRefetch();
    }
  };

  const creator = blog.user ? blog.user.name : undefined;
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button type="button" onClick={showAll}>
          {toggleDetails ? "hide" : "view"}
        </button>
      </div>
      <div style={disp}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button type="button" onClick={handleLike}>
            like
          </button>
        </p>
        <p>{creator}</p>
        {creator === name ? (
          <button type="button" onClick={handleRemove}>
            remove
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Blog;
