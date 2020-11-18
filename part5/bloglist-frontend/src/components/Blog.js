import React, { useState } from "react";
const Blog = ({ blog }) => {
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
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button type="button" onClick={showAll}>
          {toggleDetails ? "hide" : "view"}
        </button>
      </div>
      <div style={disp}>test text</div>
    </div>
  );
};

export default Blog;
