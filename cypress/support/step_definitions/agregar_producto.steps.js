import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");
const NewArticuloPage = require("../../pages/NuevoArticuloPage");

// Instancias de las páginas
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const articulosPage = new ArticulosPage();
const newArticuloPage = new NewArticuloPage();

// ==================== STEPS DE CONFIGURACIÓN INICIAL ====================
Given("que estoy en la página de login", () => {
  cy.viewport(1280, 720);
  cy.clearCookies();
  cy.clearLocalStorage();
  loginPage.visit();
});

// ==================== STEPS DE AUTENTICACIÓN ====================
When("ingreso mis credenciales válidas", () => {
  loginPage.login("testeradl@test.com", "Tester@2025");
});

// ==================== STEPS DE NAVEGACIÓN ====================
When("navego a la sección de los artículos", () => {
  dashboardPage.goToArticulos();
});

// ==================== STEPS DE CREACIÓN DE PRODUCTOS ====================
When("presiono el botón para agregar un nuevo artículo", () => {
  articulosPage.createArticle();
});

When("completo el formulario con los datos del iPhone 16", () => {
  newArticuloPage.AddArticle(
    "IPHONE-16",
    "iPhone 16 Nuevo",
    10,
    100000,
    150000,
    "Unidad"
  );
});

// ==================== STEPS DE VERIFICACIÓN ====================
Then("debería ver el producto registrado correctamente", () => {
  // Esperar a que aparezca el mensaje de éxito o el producto en la lista
  cy.contains("iPhone 16 Nuevo", { timeout: 10000 }).should("exist");

  // Verificación adicional - pueden descomentarse según necesidad
  // cy.contains("Producto registrado exitosamente").should("exist");
  // cy.url().should("include", "/articulos");
});
