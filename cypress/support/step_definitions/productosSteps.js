const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");
const NewArticuloPage = require("../../pages/NuevoArticuloPage");

// Instancias de las páginas
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();
const articulosPage = new ArticulosPage();
const newArticulosPage = new NewArticuloPage();

// Variables para compartir datos entre steps
let productData = {};

// ==================== ANTECEDENTES ====================
Given("que el usuario navega al sistema", () => {
  loginPage.visit();
});

Given("la resolución de pantalla es {int}x{int}", (width, height) => {
  cy.viewport(width, height);
});

Given("se limpian las cookies y localStorage", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// ==================== PASOS DE LOGIN ====================
Given("que el usuario está en la página de login", () => {
  loginPage.verifyLoginPageIsLoaded();
});

When("ingresa las credenciales válidas:", (dataTable) => {
  const credentials = dataTable.hashes()[0];
  loginPage.fillCredentials(credentials.email, credentials.password);
});

When("hace clic en el botón de iniciar sesión", () => {
  loginPage.clickLoginButton();
});

Then("debería ser redirigido al dashboard principal", () => {
  dashboardPage.verifyDashboardIsLoaded();
});

// ==================== NAVEGACIÓN ====================
When("navega a la sección de {string}", (section) => {
  if (section === "Artículos") {
    dashboardPage.goToArticulos();
  }
});

Then("debería ver la página de gestión de artículos", () => {
  articulosPage.verifyArticulosPageIsLoaded();
});

// ==================== CREACIÓN DE PRODUCTOS ====================
When("hace clic en {string}", (buttonText) => {
  if (buttonText === "Crear nuevo artículo") {
    articulosPage.createArticle();
  } else if (buttonText === "Guardar producto") {
    newArticulosPage.submitForm();
  }
});

Then("debería ver el formulario de registro de producto", () => {
  newArticulosPage.verifyFormIsDisplayed();
});

When("completa el formulario con los siguientes datos:", (dataTable) => {
  const data = dataTable.hashes()[0];
  productData = data; // Guardamos para usar en otros steps

  newArticulosPage.fillProductForm({
    codigo: data.código,
    nombre: data.nombre,
    stock: parseInt(data.stock),
    precioCompra: parseInt(data.precio_compra),
    precioVenta: parseInt(data.precio_venta),
    unidadMedida: data.unidad_medida,
  });
});

Then("debería ver el mensaje {string}", (expectedMessage) => {
  newArticulosPage.verifySuccessMessage(expectedMessage);
});

Then(
  "el producto {string} debería aparecer en la lista de artículos",
  (productName) => {
    articulosPage.verifyProductInList(productName);
  }
);
