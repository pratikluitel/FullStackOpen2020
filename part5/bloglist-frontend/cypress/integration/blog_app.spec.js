describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    let user = {
      name: "Admin",
      username: "admin",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    user = {
      name: "Not Admin",
      username: "noadmin",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("admin");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("blogs");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("admin");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Error: Wrong");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "admin", password: "password" });
    });

    it("A blog can be created", function () {
      cy.get("#createblog").click();
      cy.get("#title").type("title");
      cy.get("#author").type("author");
      cy.get("#url").type("url");
      cy.get("#create").click();
    });
  });
  describe.only("When blogs are present", function () {
    beforeEach(function () {
      cy.login({ username: "admin", password: "password" });
      cy.createBlog({ title: "blog one", author: "b", url: "c" });
      cy.login({ username: "admin", password: "password" });
    });

    it("liking blog works", function () {
      cy.get("#view").click().get("#like").click();
      cy.contains("likes 1");
    });
    it("deleting blog doesn't work if not done by actual user", function () {
      cy.login({ username: "noadmin", password: "password" });
      cy.get("#view").click().get("#remove").should("not.exist");
    });
    it("deleting blog works if done by actual user", function () {
      cy.get("#view").click().get("#remove").click();
      cy.on("window:confirm", (str) => {
        expect(str).to.eq("Remove blog blog one by b?");
      });
      cy.get(".blog").should("not.exist");
    });
  });
});
