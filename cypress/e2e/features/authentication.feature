Feature: Autenticación de Usuario

   Scenario: Usuario no registrado no puede acceder al sistema
    Given el usuario está en la página de login
    When ingreso mis credenciales incorrectas y hago login
    Then el usuario debería ver un mensaje de error
    