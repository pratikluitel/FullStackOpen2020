import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setErrorMessage, setMessage, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();
    try {
      await blogService.add({ title: title, author: author, url: url });
      setTitle("");
      setUrl("");
      setAuthor("");
      setMessage(`a new blog ${title} by ${author} added`);
      setErrorMessage(null);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage(
        "Error: " + exception.response.data.error
          ? exception.response.data.error
          : exception.message
      );
      setErrorMessage(
        "Error: " + exception.response.data.error
          ? exception.response.data.error
          : exception.message
      );
      setTimeout(() => {
        setMessage(null);
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {" "}
          title{" "}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          author{" "}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          url{" "}
          <input
            type="text"
            value={url}
            name="Author"
            onChange={({ target }) => setUrl(target.value)}
          />{" "}
        </div>
        <button type="submit">create</button>{" "}
      </form>
    </>
  );
};

export default BlogForm;
