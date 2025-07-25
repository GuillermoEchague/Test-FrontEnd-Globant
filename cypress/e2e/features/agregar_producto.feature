Feature: Agregar un nuevo producto

  @smoke
  Scenario: Registrar un producto llamado iPhone 16
    Given que estoy en la página de login
    When ingreso mis credenciales válidas
    And navego a la sección de los artículos
    And presiono el botón para agregar un nuevo artículo
    And completo el formulario con los datos del iPhone 16
    Then debería ver el producto registrado correctamente