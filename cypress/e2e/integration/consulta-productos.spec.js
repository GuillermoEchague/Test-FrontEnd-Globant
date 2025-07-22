const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");

describe("Consulta de Artículos (Productos) - Flujo Completo", () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const articulosPage = new ArticulosPage();

  beforeEach(() => {
    cy.viewport(1280, 720);
    // Limpiar cookies y localStorage para cada test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Debería permitir login y navegación completa a artículos", () => {
    // 1. Visitar página de login
    loginPage.visit();

    // 2. Login con credenciales válidas
    loginPage.login("testeradl@test.com", "Tester@2025");

    // 3. Navegar a la sección de artículos
    dashboardPage.goToArticulos();

    // 4. Verificar que llegamos a la página de artículos
    articulosPage.verifyArticulosPageUrl();
  });
});
