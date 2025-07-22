// Comando principal de login para autenticación
Cypress.Commands.add(
  "login",
  (email = Cypress.env("email"), password = Cypress.env("password")) => {
    cy.visit("/");
    cy.wait(2000);

    cy.get("body").then(($body) => {
      // Verificar si ya estamos en la página de login
      if ($body.find('input[type="email"], input[name="email"]').length > 0) {
        cy.loginForm(email, password);
      } else {
        // Buscar y hacer clic en botón de login
        cy.get(
          'a[href*="login"], button:contains("Iniciar"), .login-btn, [data-cy="login-link"]'
        )
          .first()
          .click();
        cy.wait(1000);
        cy.loginForm(email, password);
      }
    });
  }
);

// Comando auxiliar para completar formulario de login
Cypress.Commands.add("loginForm", (email, password) => {
  // Llenar email
  cy.get(
    'input[type="email"], input[name="email"], input[placeholder*="email" i], input[placeholder*="correo" i]'
  )
    .first()
    .clear()
    .type(email);

  // Llenar contraseña
  cy.get(
    'input[type="password"], input[name="password"], input[placeholder*="password" i], input[placeholder*="contraseña" i]'
  )
    .first()
    .clear()
    .type(password);

  // Hacer clic en submit
  cy.get(
    'button[type="submit"], input[type="submit"], button:contains("Iniciar"), button:contains("Entrar"), .login-button'
  )
    .first()
    .click();

  // Verificar autenticación exitosa
  cy.url().should("not.include", "/login", { timeout: 10000 });
});

// Comando para navegación a artículos/productos
Cypress.Commands.add("navigateToProducts", () => {
  // Selector específico para el enlace de Artículos
  cy.get(
    'a[href="/articulos"], a.bg-indigo-600[href="/articulos"], nav a:contains("Artículos")'
  )
    .first()
    .click();
  cy.waitForPageLoad();
});

// Comando para esperar carga completa de página
Cypress.Commands.add("waitForPageLoad", () => {
  cy.window().should("have.property", "document");
  cy.document().should("have.property", "readyState", "complete");
  cy.wait(1000); // Espera adicional para elementos dinámicos
});
