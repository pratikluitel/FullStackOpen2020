describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Admin",
      username: "admin",
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
  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "admin",
        password: "password",
      }).then((response) => {
        localStorage.setItem("User", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });

    it("A blog can be created", function () {
      cy.get("#createblog").click();
      cy.get("#title").type("title");
      cy.get("#author").type("author");
      cy.get("#url").type("url");
      cy.get("#create").click();
    });
  });
});
