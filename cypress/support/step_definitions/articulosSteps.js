const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const articulosPage = new ArticulosPage();

Given("que tengo credenciales válidas", () => {
  // Preparación común si es necesaria
});

When("ingreso mis credenciales y hago login", () => {
  loginPage.login(Cypress.env("email"), Cypress.env("password"));
});

When("navego a la sección de artículos", () => {
  dashboardPage.goToArticulos();
});

Then("debo ver la lista de artículos disponibles", () => {
  articulosPage.verifyArticulosListVisible();
});
