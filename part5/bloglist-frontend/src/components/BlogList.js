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

  const handleSubmit = async (title, author, url, event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();
    try {
      await blogService.add({ title: title, author: author, url: url });
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

  const handleLike = async (blog) => {
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
        <BlogForm handleSubmit={handleSubmit} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          name={user.name}
          blog={blog}
          handleLike={handleLike}
        />
      ))}
    </>
  );
};

export default BlogList;
