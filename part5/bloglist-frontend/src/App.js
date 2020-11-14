import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/loginService";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [errorMessage]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("User");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("User", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage("Error: Wrong username or password");
      setErrorMessage("Error: Wrong username or password");
      setTimeout(() => {
        setMessage(null);
        setErrorMessage(null);
      }, 5000);
    }
  };
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

  const loginForm = () => (
    <>
      <h2>Login to application</h2>

      {message === null ? null : errorMessage === null ? (
        <div className="success">{message}</div>
      ) : (
        <div className="error">{message}</div>
      )}
      <form onSubmit={handleLogin}>
        <div>
          {" "}
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />{" "}
        </div>{" "}
        <div>
          {" "}
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />{" "}
        </div>{" "}
        <button type="submit">login</button>{" "}
      </form>
    </>
  );

  const blogList = () => (
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

  return <div>{user === null ? loginForm() : blogList()}</div>;
};

export default App;
