import React, { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import Togglable from "./Togglable";
import blogService from "../services/blogs";
import BlogForm from "./BlogForm";

const BlogList = ({
  message,
  setMessage,
  errorMessage,
  setErrorMessage,
  user,
  setUser,
}) => {
  const [blogs, setBlogs] = useState([]);
  const [refetch, setRefetch] = useState([]);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [message, refetch]);

  const toggleRefetch = () => {
    setRefetch(!refetch);
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

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm
          setErrorMessage={setErrorMessage}
          setMessage={setMessage}
          blogFormRef={blogFormRef}
        />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} toggleRefetch={toggleRefetch} />
      ))}
    </>
  );
};

export default BlogList;
