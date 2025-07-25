Característica: Gestión de productos en el sistema
  Como usuario registrado del sistema
  Quiero poder acceder y registrar nuevos productos
  Para mantener actualizado el inventario de la empresa

  Antecedentes:
    Dado que el usuario navega al sistema
    Y la resolución de pantalla es 1280x720
    Y se limpian las cookies y localStorage

  @smoke @productos
  Escenario: Registro exitoso de producto iPhone 16
    Dado que el usuario está en la página de login
    Cuando ingresa las credenciales válidas:
      | email              | password    |
      | testeradl@test.com | Tester@2025 |
    Y hace clic en el botón de iniciar sesión
    Entonces debería ser redirigido al dashboard principal
    
    Cuando navega a la sección de "Artículos"
    Entonces debería ver la página de gestión de artículos
    
    Cuando hace clic en "Crear nuevo artículo"
    Entonces debería ver el formulario de registro de producto
    
    Cuando completa el formulario con los siguientes datos:
      | campo           | valor           |
      | código          | IPHONE-16       |
      | nombre          | iPhone 16 Nuevo |
      | stock           | 10              |
      | precio_compra   | 100000          |
      | precio_venta    | 150000          |
      | unidad_medida   | Unidad          |
    Y hace clic en "Guardar producto"
    Entonces debería ver el mensaje "Producto registrado exitosamente"
    Y el producto "iPhone 16 Nuevo" debería aparecer en la lista de artículos

  