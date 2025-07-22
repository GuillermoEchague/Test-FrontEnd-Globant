class NewArticuloPage {
  verifyArticulosNuevosPageUrl() {
    cy.url().should("include", "/articulos/nuevo");
  }

  fillCodigo(text) {
    cy.get("#sku").type(text);
  }

  fillDescription(text) {
    cy.get("#name").type(text);
  }

  fillStock(number) {
    cy.get("#stock_quantity").type(number);
  }

  fillCost(number) {
    cy.get("#cost_price").type(number);
  }

  fillSalePrice(number) {
    cy.get("#sale_price").type(number);
  }

  submit() {
    cy.get('button[type="submit"]').click();
  }

  // Selectores
  get unitSelect() {
    return cy.get('select[name="unit"]');
  }

  get unitLabel() {
    return cy.contains("label", "Unidad de Medida");
  }

  // Métodos de acción
  selectUnit(unit) {
    this.unitSelect.select(unit);
    return this;
  }

  selectUnitByValue(value) {
    this.unitSelect.select(value);
    return this;
  }

  // Métodos de verificación
  verifyUnitSelected(expectedUnit) {
    this.unitSelect.should("have.value", expectedUnit);
    return this;
  }

  verifyUnitOptions(expectedOptions) {
    this.unitSelect
      .find("option")
      .should("have.length", expectedOptions.length + 1); // +1 por "Selecciona"
    expectedOptions.forEach((option) => {
      this.unitSelect.find("option").contains(option).should("exist");
    });
    return this;
  }

  verifyUnitSelectVisible() {
    this.unitSelect.should("be.visible").should("not.be.disabled");
    return this;
  }

  AddArticle(codigo, description, stock, cost, price) {
    this.verifyArticulosNuevosPageUrl();
    this.fillCodigo(codigo);
    this.fillDescription(description);
    this.fillStock(stock);
    this.fillCost(cost);
    this.fillSalePrice(price);
    this.selectUnitByValue(0);
    this.submit();
  }
}

module.exports = NewArticuloPage;
