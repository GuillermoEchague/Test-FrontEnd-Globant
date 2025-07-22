class ArticulosPage {
  // Selectores basados en el HTML que proporcionaste
  get selectors() {
    return {
      // Layout principal
      mainContainer: 'div[class*="flex w-full h-screen bg-gray-50"]',
      sidebar: 'aside[class*="relative min-h-screen"]',
      header:
        'header[class*="flex items-center justify-end w-full h-16 px-6 bg-white shadow-sm"]',
      mainContent: 'main[class="flex-1 p-6 overflow-y-auto"]',

      // Contenedores de artículos
      articulosContainer: 'div[class="mt-6 space-y-4"]',
      articuloCard:
        'div[class*="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md"]',

      // Botones y controles
      primaryButton: 'button[class*="bg-indigo-600"]',
      actionButton:
        'button[class*="inline-flex items-center justify-center px-4 py-2 text-sm font-medium"]',

      // Elementos responsive
      hiddenLgBlock: 'div[class*="hidden lg:block"]',
      blockLgHidden: 'div[class="block lg:hidden"]',
      smFlex: 'div[class*="sm:flex sm:items-center"]',

      // Notificaciones
      toastContainer: 'section[class="Toastify"]',

      // Legacy selectors (mantener compatibilidad)
      articulosList: ".articulos-list",
      articuloItem: ".articulo-item",
    };
  }

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

  // Nuevos métodos basados en el HTML actual
  verifyMainLayout() {
    cy.get(this.selectors.mainContainer).should("be.visible");
    cy.get(this.selectors.sidebar).should("exist");
    cy.get(this.selectors.mainContent).should("be.visible");
    return this;
  }

  verifyHeader() {
    cy.get(this.selectors.header).should("be.visible");
    return this;
  }

  verifyPrimaryButtonVisible() {
    cy.get(this.selectors.primaryButton).should("be.visible");
    return this;
  }

  clickPrimaryButton() {
    cy.get(this.selectors.primaryButton)
      .should("be.visible")
      .and("not.be.disabled")
      .click();
    return this;
  }

  verifyButtonHoverEffect() {
    cy.get(this.selectors.primaryButton)
      .should("have.class", "hover:bg-indigo-700")
      .trigger("mouseover");
    return this;
  }

  verifyButtonFocusState() {
    cy.get(this.selectors.primaryButton)
      .focus()
      .should("have.class", "focus:ring-2");
    return this;
  }

  verifyArticuloCards() {
    cy.get(this.selectors.articuloCard).should("exist").and("be.visible");
    return this;
  }

  verifyCardHoverEffect() {
    cy.get(this.selectors.articuloCard)
      .first()
      .trigger("mouseover")
      .should("have.class", "hover:shadow-md");
    return this;
  }

  clickArticuloCard(index = 0) {
    cy.get(this.selectors.articuloCard).eq(index).click();
    return this;
  }

  verifyResponsiveElements() {
    // Verificar elementos ocultos/visibles según viewport
    cy.viewport(1024, 768);
    cy.get(this.selectors.hiddenLgBlock).should("not.be.visible");

    cy.viewport(640, 480);
    cy.get(this.selectors.blockLgHidden).should("be.visible");
    return this;
  }

  verifyToastContainer() {
    cy.get(this.selectors.toastContainer)
      .should("exist")
      .and("have.attr", "aria-live", "polite");
    return this;
  }

  verifyOverflowHandling() {
    cy.get(this.selectors.mainContent).should("have.css", "overflow-y", "auto");
    return this;
  }

  verifyFlexLayout() {
    cy.get(this.selectors.smFlex).should("exist");
    return this;
  }

  // Métodos de utilidad para testing
  waitForPageLoad() {
    this.verifyMainLayout();
    this.verifyHeader();
    cy.get(this.selectors.mainContent).should("be.visible");
    return this;
  }

  verifyAccessibility() {
    // Verificar que los botones tienen type
    cy.get("button").each(($btn) => {
      cy.wrap($btn).should("have.attr", "type");
    });

    // Verificar aria labels
    cy.get(this.selectors.toastContainer).should("have.attr", "aria-live");
    return this;
  }

  // Método para verificar la carga completa de la página
  verifyFullPageLoad() {
    cy.viewport(375, 667); // Móvil, para mostrar .block.lg:hidden
    this.waitForPageLoad();
    this.verifyArticulosListVisible();
    this.verifyPrimaryButtonVisible();
    this.verifyToastContainer();
    return this;
  }

  // Método para interacciones complejas
  performCompleteFlow(minArticulosCount = 1) {
    this.verifyFullPageLoad();
    this.verifyMinimumArticulos(minArticulosCount);
    this.clickPrimaryButton();
    this.verifyArticuloCards();
    return this;
  }

  // Método para testing responsive
  testResponsiveDesign() {
    const viewports = [
      { width: 1280, height: 720, name: "desktop" },
      { width: 768, height: 1024, name: "tablet" },
      { width: 375, height: 667, name: "mobile" },
    ];

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height);
      cy.get(this.selectors.mainContainer).should("be.visible");
      cy.get(this.selectors.header).should("be.visible");
    });
    return this;
  }

  // Métodos de validación específicos
  validateCardStructure(cardIndex = 0) {
    cy.get(this.selectors.articuloCard)
      .eq(cardIndex)
      .should("have.class", "p-4")
      .and("have.class", "bg-white")
      .and("have.class", "border")
      .and("have.class", "rounded-lg")
      .and("have.class", "shadow-sm")
      .and("have.class", "cursor-pointer");
    return this;
  }

  validateButtonStructure() {
    cy.get(this.selectors.primaryButton)
      .should("have.class", "inline-flex")
      .and("have.class", "items-center")
      .and("have.class", "justify-center")
      .and("have.class", "bg-indigo-600");
    return this;
  }

  createArticle() {
    cy.get('button[type="button"]').contains("Crear").click();
  }
}

module.exports = ArticulosPage;
