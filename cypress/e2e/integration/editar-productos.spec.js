const LoginPage = require("../../pages/LoginPage");
const DashboardPage = require("../../pages/DashboardPage");
const ArticulosPage = require("../../pages/ArticulosPage");
const NewArticuloPage = require("../../pages/NuevoArticuloPage");
const EditArticuloPage = require("../../pages/EditArticuloPage");

describe("Editar Artículos (Productos)", () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const articulosPage = new ArticulosPage();
  const newArticulosPage = new NewArticuloPage();
  const editArticuloPage = new EditArticuloPage();

  beforeEach(() => {
    cy.viewport(1280, 720);
    // Limpiar cookies y localStorage para cada test
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("Debería permitir login y agregar artículos", () => {
    // 1. Visitar página de login
    loginPage.visit();

    // 2. Login con credenciales válidas
    loginPage.login("testeradl@test.com", "Tester@2025");

    // 3. Navegar a la sección de artículos
    dashboardPage.goToArticulos();

    // 4. Verificar que llegamos a la página de artículos

    // O verificar primero y luego seleccionar
    editArticuloPage.verifyiPhoneTdExists().selectiPhoneTd();
    // Método genérico para otros productos
    //editArticuloPage.selectTdByText("Iphone 16 Pro Max");
    newArticulosPage.submitEditar();
    newArticulosPage.EditArticle(
      "IPHONE-16",
      "Iphone 16 para Iphone 16 Pro Max",
      10,
      100000,
      150000,
      "Unidad"
    );
  });
});
