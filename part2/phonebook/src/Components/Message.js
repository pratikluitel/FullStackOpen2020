import React from "react";

const Message = ({ message, setMessage, error }) => {
  const cl = error ? "error" : "success";
  if (message === null) return null;
  setTimeout(() => setMessage(null), 5000);
  return <div className={cl}>{message}</div>;
};

export default Message;
