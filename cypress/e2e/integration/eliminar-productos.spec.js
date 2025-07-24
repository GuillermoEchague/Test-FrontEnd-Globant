const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const EditArticuloPage = require("../../pages/EditArticuloPage");

describe("Eliminar Artículos (Productos)", () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const editArticuloPage = new EditArticuloPage();
  beforeEach(() => {
    cy.viewport(1280, 720);
    // Limpiar cookies y localStorage para cada test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Debería eliminar artículos iPhone 16 Pro Max", () => {
    // 1. Visitar página de login
    loginPage.visit();

    // 2. Login con credenciales válidas
    loginPage.login("testeradl@test.com", "Tester@2025");

    // 3. Navegar a la sección de artículos
    dashboardPage.goToArticulos();

    editArticuloPage.clickDeleteButtonForIphoneProMax();
  });
});
