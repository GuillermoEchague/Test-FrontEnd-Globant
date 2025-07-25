import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");
const NewArticuloPage = require("../../pages/NuevoArticuloPage");
const EditArticuloPage = require("../../pages/EditArticuloPage");

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const articulosPage = new ArticulosPage();
const newArticulosPage = new NewArticuloPage();
const editArticuloPage = new EditArticuloPage();

Given("que estoy en la página de login producto", () => {
  cy.viewport(1280, 720);
  cy.clearCookies();
  cy.clearLocalStorage();
  loginPage.visit();
});

When("ingreso las credenciales válidas", () => {
  loginPage.login("testeradl@test.com", "Tester@2025");
});

When("navego a la sección de donde estan los artículos", () => {
  dashboardPage.goToArticulos();
});

When("selecciono el producto iPhone 16 para editar", () => {
  editArticuloPage.verifyiPhoneTdExists();
  editArticuloPage.selectiPhoneTd();
  newArticulosPage.submitEditar(); // botón que lleva al formulario de edición
});

When("edito el formulario con los nuevos datos del producto", () => {
  newArticulosPage.EditArticle(
    "IPHONE-16",
    "Iphone 16 Pro Max",
    10,
    100000,
    150000,
    "Unidad"
  );
});

Then("debería ver el producto actualizado correctamente", () => {
  cy.contains("Iphone 16 Pro Max").should("exist");
});
