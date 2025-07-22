class DashboardPage {
  goToArticulos() {
    cy.contains("span", "Entidades").click();
    cy.get('a[href="/articulos"]').click();
  }
}

module.exports = DashboardPage;
