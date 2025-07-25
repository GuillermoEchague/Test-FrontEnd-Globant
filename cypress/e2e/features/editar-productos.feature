Feature: Editar un producto existente

  Como usuario registrado
  Quiero poder acceder al sistema
  Para actualizar el producto con nombre iPhone 16 a iPhone 16 Pro Max con nuevos datos complementarios

  Scenario: Editar el producto iPhone 16
    Given que estoy en la página de login producto
    When ingreso las credenciales válidas
    And navego a la sección de donde estan los artículos
    And selecciono el producto iPhone 16 para editar
    And edito el formulario con los nuevos datos del producto
    Then debería ver el producto actualizado correctamente
