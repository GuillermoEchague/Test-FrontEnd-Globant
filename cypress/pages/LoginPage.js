class LoginPage {
  visit() {
    cy.visit("https://test-adl.leonardojose.dev");
  }

  fillEmail(email) {
    cy.get("#email").type(email);
  }

  fillPassword(password) {
    cy.get("#password").type(password);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  shouldRedirectToDashboard() {
    cy.url().should("include", "/dashboard");
  }

  shouldShowAlertWithMessage(expectedMessage) {
    // Validación estricta del role="alert" y su contenido
    cy.get('[role="alert"]')
      .should("exist")
      .and("contain.text", expectedMessage);

    return this;
  }
}

module.exports = LoginPage;
