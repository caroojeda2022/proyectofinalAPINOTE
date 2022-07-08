# Proyecto final APINOTE

Este ejercicio consiste en crear una API que simula publicar notas privadas y categorizarlas.

Base de datos vacía en una instancia de MySQL local. Guardar el archivo .env.example como .env y cubrir los datos necesarios. Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada. Ejecutar npm run dev o npm start para lanzar el servidor.

##Entidades:

-USER:

- id - Usuario Anónimo.
- email.
- password.
- idUser - Usuarios registrado.
- registro - email.
- passUser - password.
  
  -NOTE:
  
  -id
  -User
  -createdNote - Creación nota de texto.
  -idNote - Título de notas de texto.
  -inforNote - Información de nota de texto (U.registrado).
  -modifiedNote - Modificar la nota (Título,texto y categoría).
  -deleteNote - Eliminar la nota.
  -pubNote - Marcar la nota como pública (Por el usuario creador de la nota, que es un usuario registrado).
  -imagen unica por cada nota.

##Endpoints:

- **POST / user** - Registro de usuario anónimo.
- **GET / user/ :id** Devuelve información usuario anónimo.
- **POST / login** Registro de usuario registrado.
- **GET / idUser** Devuelve información del usuario registrado.
- **POST /** Permite crear una nota (necesita cabecera de token) (título,texto y categoría única (fijas)
- **GET /** Lista títulos de notas de usuarios registrados.
- **PUT /** Permite crear, editar y borrar categorías (titulo, texto y categoría única.
- **GET /** Muestra lista de notas públicas liberadas por usuarios registrados, a usuario no registrados. - **POST /** Marcar una nota privada como pública.
- **POST /** Asociar una imagen (única) a cada nota.
  **DELETE /** Eliminar una nota del usuario registrado que la creo.

Si una nota es pública puede ser leída por cualquier usuario registrado y logueado en la api, si conoce la URL.
Las notas públicas solo se pueden acceder si conoce la URL.
