import React, { useState } from "react";
import blogService from "../services/blogs";
const Blog = ({ name, blog, toggleRefetch, handleLike }) => {
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
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button type="button" onClick={showAll}>
          {toggleDetails ? "hide" : "view"}
        </button>
      </div>
      <div style={disp} className="bloginfo">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button type="button" onClick={() => handleLike(blog)}>
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
