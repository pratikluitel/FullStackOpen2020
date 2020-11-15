import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import "./index.css";

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("User");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm
          message={message}
          setMessage={setMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setUser={setUser}
        />
      ) : (
        <BlogList
          message={message}
          setMessage={setMessage}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          user={user}
          setUser={setUser}
        />
      )}
    </div>
  );
};

export default App;
