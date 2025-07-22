import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pages/LoginPage";

const loginPage = new LoginPage();

Given("el usuario está en la página de login", () => {
  loginPage.visit();
});

Given("el usuario tiene credenciales válidas", () => {
  // Las credenciales están configuradas en cypress.config.js
  cy.wrap({
    email: Cypress.env("credentials.email"),
    password: Cypress.env("credentials.password"),
  }).as("validCredentials");
});

When("el usuario ingresa su email {string}", (email) => {
  loginPage.fillEmail(email);
});

When("el usuario ingresa su contraseña {string}", (password) => {
  loginPage.fillPassword(password);
});

When("el usuario hace clic en el botón de iniciar sesión", () => {
  loginPage.clickLogin();
});

When("el usuario se autentica con credenciales válidas", () => {
  loginPage.login(Cypress.env("email"), Cypress.env("password"));
});

Then("el usuario debería ser redirigido al dashboard principal", () => {
  loginPage.shouldRedirectToDashboard();
});

Then("el usuario debería ver un mensaje de error", () => {
  loginPage.shouldShowError();
});

Then("el usuario no debería ser redirigido al dashboard", () => {
  cy.url().should("not.include", "/dashboard");
  cy.url().should("include", "/login"); // o la URL de login que corresponda
});
