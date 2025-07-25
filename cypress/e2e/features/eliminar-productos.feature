Feature: Eliminar un producto

  Como usuario registrado
  Quiero poder acceder al sistema
  Para eliminar el producto con nombre iPhone 16 Pro Max

  Scenario: Eliminar el producto iPhone 16 Pro Max
    Given estoy en la página de login
    When ingreso credenciales válidas
    And navego a sección de artículos
    And elimino el producto iPhone 16 Pro Max
    Then debería dejar de ver el producto iPhone 16 Pro Max en la lista
