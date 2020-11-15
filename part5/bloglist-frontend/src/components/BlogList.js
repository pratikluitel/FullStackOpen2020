import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const BlogList = ({
  message,
  setMessage,
  errorMessage,
  setErrorMessage,
  user,
  setUser,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [message]);

  const handleSubmit = async (event) => {
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
        `Error: ` + exception.response.data.error
          ? exception.response.data.error
          : exception.message
      );
      setErrorMessage(
        `Error: ` + exception.response.data.error
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
      <h2>blogs</h2>
      <p>
        {user.name} logged in{" "}
        <button
          type="button"
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          logout
        </button>
      </p>
      {message === null ? null : errorMessage === null ? (
        <div className="success">{message}</div>
      ) : (
        <div className="error">{message}</div>
      )}
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

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
