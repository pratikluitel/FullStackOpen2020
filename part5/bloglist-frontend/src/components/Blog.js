import React, { useState } from "react";

const Blog = ({ name, blog, handleLike, handleRemove }) => {
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

  const creator = blog.user ? blog.user.name : undefined;
  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title} {blog.author}{" "}
        <button id="view" type="button" onClick={showAll}>
          {toggleDetails ? "hide" : "view"}
        </button>
      </div>
      <div style={disp} className="bloginfo">
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button id="like" type="button" onClick={() => handleLike(blog)}>
            like
          </button>
        </p>
        <p>{creator}</p>
        {creator === name ? (
          <button id="remove" type="button" onClick={() => handleRemove(blog)}>
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
