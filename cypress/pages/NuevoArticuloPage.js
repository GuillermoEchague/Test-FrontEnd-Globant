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

  selectSpan(text) {
    cy.get("span").filter(`:contains(${text})`).click();
  }

  submitEditar() {
    cy.get("button").contains("Editar").click();
  }

  // GETTERS (solo devuelven elementos, no ejecutan acciones)
  get unitSelect() {
    return cy.get("#unit");
  }

  get unitLabel() {
    return cy.contains("label", "Unidad de Medida");
  }

  // MÉTODOS DE ACCIÓN PARA UNIDADES
  selectUnit(unit) {
    this.unitSelect.select(unit);
    // Verificar que se seleccionó correctamente
    this.unitSelect.should("have.value", unit);
    return this;
  }

  selectUnitByValue(value) {
    this.unitSelect.select(value);
    this.unitSelect.should("have.value", value);
    return this;
  }

  // Método específico para seleccionar por texto visible
  selectUnitByText(text) {
    this.unitSelect.select(text);
    this.unitSelect.should("contain", text);
    return this;
  }

  // MÉTODOS DE VERIFICACIÓN PARA UNIDADES
  verifyUnitSelected(expectedUnit) {
    this.unitSelect.should("have.value", expectedUnit);
    return this;
  }

  verifyUnitOptions(expectedOptions) {
    // Verificar el número total de opciones (incluyendo "Selecciona")
    this.unitSelect
      .find("option")
      .should("have.length", expectedOptions.length + 1);

    // Verificar que cada opción esperada existe
    expectedOptions.forEach((option) => {
      this.unitSelect.find(`option[value="${option}"]`).should("exist");
    });
    return this;
  }

  verifyUnitSelectVisible() {
    this.unitSelect.should("be.visible").should("not.be.disabled");
    return this;
  }

  verifyDefaultUnitOption() {
    this.unitSelect.should("have.value", ""); // El valor por defecto
    return this;
  }

  // GETTERS PARA PRODUCTOS (MEJORADOS)
  get iPhoneProduct() {
    return cy.contains("span", "iPhone 16 Pro Max", { timeout: 8000 });
  }

  get productContainer() {
    return this.iPhoneProduct.closest("div.p-4");
  }

  // Verificar que el producto existe antes de eliminar
  verifyiPhoneExists() {
    this.iPhoneProduct.should("exist").should("be.visible");
    return this;
  }

  // MÉTODOS DE COMPATIBILIDAD (mantienen la funcionalidad anterior)

  selectiPhoneAndClickRedButton() {
    return this.deleteIPhone16ProMax();
  }

  selectiPhoneWithVerification() {
    // Verificar que el iPhone existe primero
    this.verifyiPhoneExists();
    // Eliminarlo usando el método mejorado
    return this.deleteIPhone16ProMax();
  }

  // Método genérico para cualquier producto (actualizado)
  selectProductAndClickRedButton(productName) {
    return this.deleteProductByName(productName);
  }

  // MÉTODOS PARA FORMULARIOS (sin cambios)

  // MÉTODO PRINCIPAL PARA AGREGAR ARTÍCULOS
  AddArticle(codigo, description, stock, cost, price, unit) {
    this.verifyArticulosNuevosPageUrl();
    this.fillCodigo(codigo);
    this.fillDescription(description);
    this.fillStock(stock);
    this.fillCost(cost);
    this.fillSalePrice(price);
    this.selectUnit(unit);
    this.submit();
    return this;
  }

  // MÉTODO PRINCIPAL PARA AGREGAR ARTÍCULOS
  EditArticle(codigo, description, stock, cost, price, unit) {
    this.fillCodigo(codigo);
    this.fillDescription(description);
    this.fillStock(stock);
    this.fillCost(cost);
    this.fillSalePrice(price);
    this.selectUnit(unit);
    this.submit();
    return this;
  }

  // Método para limpiar el formulario
  clearForm() {
    cy.get("#sku").clear();
    cy.get("#name").clear();
    cy.get("#stock_quantity").clear();
    cy.get("#cost_price").clear();
    cy.get("#sale_price").clear();
    this.unitSelect.select(""); // Volver a la opción por defecto
    return this;
  }

  // Verificar descripción
  verifyDescriptionLabel() {
    cy.contains("span", "Descripción").should("be.visible");
    return this;
  }

  // Método mejorado para deleteElement genérico
  deleteElement() {
    cy.get('button[class*="hover:text-red-900"], button[class*="text-red"]')
      .should("be.visible")
      .click();

    this.handleDeleteConfirmation();
    return this;
  }
}

module.exports = NewArticuloPage;
