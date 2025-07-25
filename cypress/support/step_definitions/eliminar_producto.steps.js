import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const EditArticuloPage = require("../../pages/EditArticuloPage");

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const editArticuloPage = new EditArticuloPage();

Given("estoy en la página de login", () => {
  cy.viewport(1280, 720);
  cy.clearCookies();
  cy.clearLocalStorage();
  loginPage.visit();
});

When("ingreso credenciales válidas", () => {
  loginPage.login("testeradl@test.com", "Tester@2025");
});

When("navego a sección de artículos", () => {
  dashboardPage.goToArticulos();
});

When("elimino el producto iPhone 16 Pro Max", () => {
  editArticuloPage.clickDeleteButtonForIphoneProMax();
});

Then("debería dejar de ver el producto iPhone 16 Pro Max en la lista", () => {
  cy.contains("Iphone 16 Pro Max").should("not.exist");
});
