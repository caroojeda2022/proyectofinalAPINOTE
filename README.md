# proyectofinalAPINOTE - APP de notas backend y frontend

Este ejercicio consiste en crear una API que permite publicar notas privadas de texto, y categorizarlas.

Base de datos vacía en una instancia de MySQL local. 
Guardar el archivo .env.example como .env y cubrir los datos necesarios. 
Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada. 
Ejecutar npm run dev o npm start para lanzar el servidor.

Entidades:
* USER:
User - Usuario Anónimo - Login: email y password.
idUser - Usuarios registrado - Registro: email.
passUser - Registro password. 

* NOTE:
createdNote - Creación de nota de texto.
idNote - Título de la notas de texto. 
inforNote - Ver información de la nota de texto (Usuario registrado).
modifiedNote - Modificar la nota (Título,texto y categoría de la nota).
deleteNote - Eliminar la nota.
pubprivNote - Marcar la nota como pública (Usuario creador de la nota y registrado).

Endpoints: 

POST / user - Registro de usuario anónimo.
GET / Devuelve información del usuario anónimo.
POST / idUser - Registro de usuario registrado.
GET / idUser - Devuelve información del usuario.
POST / idLogin - Login del usuario registrado, (devuelve token).

POST / Permite crear una nota (necesita cabecera de token) (título,texto y categoría única (fijas)
GET / Lista títulos de notas privadas a usuarios registrados.
PUT / Permite crear, editar y borrar categorías (titulo, texto y categoría única.
GET / Muestra lista de notas públicas liberadas por usuarios registrados a usuario no registrados.
POST / Marcar una nota privada como pública. 
DELETE / Eliminar una nota por parte del usuario registrado que la creo.
POST / Asociar una imagen (única) a cada nota.

Si una nota es pública puede ser leída por cualquier usuario registrado y 
logueado en la api si conoce la URL. Las notas públicas solo se pueden acceder si conoce la URL.
