import React from "react";

const Message = ({ message, setMessage }) => {
  if (message === null) return null;
  setTimeout(() => setMessage(null), 5000);
  return <div class="success">{message}</div>;
};

export default Message;
