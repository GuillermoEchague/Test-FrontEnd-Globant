const LoginPage = require("../../pages/LoginPage");

describe("Autenticación de usuario no registrado", () => {
  const loginPage = new LoginPage();

  it("No debería permitir el acceso con credenciales inválidas", () => {
    loginPage.visit();

    // 2. Login con credenciales válidas
    loginPage.login("noexiste@test.com", "PasswordIncorrecto123");

    // Verificar mensaje de error
    loginPage.shouldShowAlertWithMessage(
      "Las credenciales proporcionadas son incorrectas."
    );
  });
});
