Feature: Consulta de Artículos

  Como usuario registrado
  Quiero poder acceder al sistema y realizar la consulta de artículos
  Para gestionar mi inventario

  Scenario: Login exitoso y consulta de artículos
    Given que tengo credenciales válidas
    When ingreso mis credenciales y hago login
    And navego a la sección de artículos
    Then debo ver la lista de artículos disponibles