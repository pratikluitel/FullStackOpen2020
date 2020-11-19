import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("event handler is called correctly when new blog is created", () => {
  const submit = jest.fn();
  const component = render(<BlogForm handleSubmit={submit} />);
  const form = component.container.querySelector("form");
  const author = component.container.querySelector("#author");
  const title = component.container.querySelector("#title");
  const url = component.container.querySelector("#url");
  fireEvent.change(author, {
    target: { value: "Author" },
  });
  fireEvent.change(title, {
    target: { value: "Title" },
  });
  fireEvent.change(url, {
    target: { value: "url.com" },
  });
  fireEvent.submit(form);
  expect(submit.mock.calls).toHaveLength(1);
});
