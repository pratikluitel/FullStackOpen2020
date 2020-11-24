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
    });
  });
});
