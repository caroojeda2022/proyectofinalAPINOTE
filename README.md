README FINAL

Proyecto final APINOTE

Este ejercicio consiste en crear una API que publica notas privadas y categorizarlas.

#RUTAS -[/home] Página de inicio.

- [/loginUser] Página de login de usuarios anónimos.
- [/registerUser] Página de registro de usuarios registrados.
- [/newNote] Página de registro de notas.

1-Página de registro
3-listar las notas por identificador y titulo.
4-crear notas
5-Notificaciones Toast

##Entidades:
-USER:
- id - Usuario Anónimo / \*\*POST /
- email.
- password.

- idUser - Usuarios registrado./ \*\*POST /
- email
- password.

-NOTE:
- createdNote - Creación nota de texto. / \*\*POST /
- idNote - Título de notas de texto. / \*\*GET /
- noteSearch- Buscador de notas
- modifiedNote - Modificar la nota (Título, texto y categoría). / \*\*PUT /
- pubNote - Marcar la nota como pública (Solo puede ser realizado por el usuario registrado). / \*\*POST /
- avatarImage - imagen única por cada nota. / \*\*POST /
- deleteNote - Eliminar la nota. /\*\*DELETE /
  ##Endpoints:
- POST / Registro de usuario anónimo.
- POST / Registro de usuario registrado.
- GET /  Devuelve información del usuario registrado.
- POST / Permite crear una nota (título, texto y categoría única)
- GET / Lista títulos de notas de usuarios registrados.
- PUT / Permite crear, editar y borrar categorías (titulo, texto y categoría única.
- GET / Muestra lista de notas públicas liberadas por usuarios registrados, a usuario no registrados.
- POST / Marcar una nota privada como pública.
- POST / Asociar una imagen (única) a cada nota.
- DELETE / Eliminar una nota del usuario registrado que la creo.
