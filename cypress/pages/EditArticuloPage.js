class EditArticuloPage {
  // GETTER para el td del iPhone
  get iPhoneTd() {
    return cy.contains("td", "iPhone 16");
  }

  // Método para seleccionar el td que contiene "Iphone 16 Pro Max"
  selectiPhoneTd() {
    this.iPhoneTd.click();
    return this;
  }

  // Método genérico para seleccionar cualquier td por texto
  selectTdByText(text) {
    cy.contains("td", text).click();
    return this;
  }

  // Verificar que el td existe
  verifyiPhoneTdExists() {
    this.iPhoneTd.should("exist").should("be.visible");
    return this;
  }

  // Método para hacer clic en el botón rojo de la fila del iPhone 16 Pro Max
  clickDeleteButtonForIphoneProMax() {
    cy.contains("td", "Iphone 16 Pro Max")
      .parent("tr")
      .find("button.ml-4.text-red-600")
      .click();
    return this;
  }
}

module.exports = EditArticuloPage;
