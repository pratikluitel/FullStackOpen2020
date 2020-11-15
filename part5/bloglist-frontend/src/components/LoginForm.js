import React, { useState } from "react";
import loginService from "../services/loginService";
import blogService from "../services/blogs";

const LoginForm = ({
  message,
  setMessage,
  errorMessage,
  setErrorMessage,
  setUser,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("User", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (exception) {
      setMessage("Error: Wrong username or password");
      setErrorMessage("Error: Wrong username or password");
      setTimeout(() => {
        setMessage(null);
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
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
};

export default LoginForm;
