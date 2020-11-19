import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("rendering <Blog/>", () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: "Blog A",
      author: "blog author",
      url: "blog.com",
      likes: 10,
    };
    component = render(<Blog blog={blog} />);
  });

  test("renders title and author, not url and likes", () => {
    const div = component.container.querySelector(".blog");
    const hiddiv = component.container.querySelector(".bloginfo");

    expect(div).toHaveTextContent("Blog A blog author");
    expect(hiddiv).toHaveStyle("display: none");
  });

  test("renders url and likes correctly when show is clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const hiddiv = component.container.querySelector(".bloginfo");
    expect(hiddiv).not.toHaveStyle("display: none");
    expect(hiddiv).toHaveTextContent("blog.comlikes 10");
  });
});
