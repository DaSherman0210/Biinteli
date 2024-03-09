# Nombre de la Aplicación

## Descripción

Esta es una aplicación de Node.js que proporciona una serie de endpoints para realizar diversas funciones. La aplicación está diseñada para ser utilizada como backend para una aplicación web o móvil.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Ejecuta `npm install` para instalar todas las dependencias.

## Uso

### Ejecutar la Aplicación

1. Ejecuta `npm start` para iniciar el servidor.
2. La aplicación estará disponible en `http://localhost:7878` por defecto.

### Endpoints Disponibles

1. **GET /api/users**
   - Devuelve una lista de todos los usuarios.

2. **GET /api/users/:id**
   - Devuelve un usuario específico según su ID.

3. **POST /api/users**
   - Crea un nuevo usuario. Se deben proporcionar los datos del usuario en el cuerpo de la solicitud.

4. **PUT /api/users/:id**
   - Actualiza los datos de un usuario existente según su ID. Se deben proporcionar los datos actualizados en el cuerpo de la solicitud.

5. **DELETE /api/users/:id**
   - Elimina un usuario existente según su ID.

6. **GET /api/products**
   - Devuelve una lista de todos los productos.

7. **GET /api/products/:id**
   - Devuelve un producto específico según su ID.

8. **POST /api/products**
   - Crea un nuevo producto. Se deben proporcionar los datos del producto en el cuerpo de la solicitud.

9. **PUT /api/products/:id**
   - Actualiza los datos de un producto existente según su ID. Se deben proporcionar los datos actualizados en el cuerpo de la solicitud.

10. **DELETE /api/products/:id**
    - Elimina un producto existente según su ID.

