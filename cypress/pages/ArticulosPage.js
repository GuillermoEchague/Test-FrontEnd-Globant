class ArticulosPage {
  // Selectores basados en el HTML que proporcionaste
  // Métodos existentes actualizados
  //TODO: Corregir este metodo
  verifyArticulosListVisible() {
    // Intentar con el selector legacy primero, luego con los nuevos
    cy.get("main")
      .should("have.class", "flex-1")
      .should("have.class", "p-6")
      .should("have.class", "overflow-y-auto");

    // Verificar div con flexbox responsive
    cy.get("div.sm\\:flex.sm\\:items-center")
      .should("exist")
      .within(() => {
        // Verificar elementos internos
        cy.get("div.sm\\:flex-auto").should("exist");
        cy.get("h1").should("exist");
        cy.get("p").should("exist");
      });

    // Verificar divs con clases específicas
    cy.get("div.mt-4.sm\\:mt-0.sm\\:ml-16.sm\\:flex-none").should("exist");
    cy.get("div.mt-6").should("exist");
    cy.get("div.hidden.lg\\:block").should("exist");
    cy.get("div.block.lg\\:hidden").should("exist");
  }

  clickFirstArticulo() {
    // Intentar con selector legacy, luego con el nuevo
    cy.get("body").then(($body) => {
      if ($body.find(this.selectors.articuloItem).length > 0) {
        cy.get(`${this.selectors.articuloItem}:first`).click();
      } else {
        cy.get(this.selectors.articuloCard).first().click();
      }
    });
  }

  verifyArticulosPageUrl() {
    cy.url().should("include", "/articulos");
  }

  createArticle() {
    cy.get('button[type="button"]').contains("Crear").click();
  }
}

module.exports = ArticulosPage;
