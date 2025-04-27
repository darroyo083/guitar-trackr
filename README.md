# Guitar Trackr 🎸
Una API para gestionar canciones de guitarra y realizar un seguimiento del progreso de aprendizaje.

## Características
- **Autenticación**: Registro, inicio de sesión y manejo de sesiones con JWT.
- **Gestión de usuarios**: CRUD de usuarios y roles (usuario/admin).
- **Gestión de canciones**: CRUD de canciones con detalles como dificultad, afinación y enlaces a tablaturas.
- **Relación usuario-canción**: Los usuarios pueden añadir canciones a su repertorio y marcarlas como aprendidas.
- **API**: Endpoints bien definidos para interactuar con los datos.
- **Docker**: Configuración lista para desarrollo y despliegue con Docker.

## Requisitos previos
- Node.js v20 o superior
- Docker y Docker Compose
- MySQL Workbench (opcional, para inspeccionar la base de datos)

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/darroyo083/guitar-trackr.git
   cd guitar-trackr
   ```

2. Crea un archivo `.env` basado en `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Configura las variables de entorno en `.env` según tu entorno.

4. Inicia los contenedores Docker:
   ```bash
   docker-compose up --build
   ```

5. Accede a la API en `http://localhost:3020`.

## Uso
### Endpoints principales
#### Autenticación
- **POST /api/auth/register**: Registrar un nuevo usuario.
- **POST /api/auth/login**: Iniciar sesión y obtener un token JWT.
- **GET /api/auth/profile**: Obtener el perfil del usuario autenticado.

#### Canciones
- **GET /api/songs**: Obtener todas las canciones.
- **GET /api/songs/:id**: Obtener una canción por ID.
- **POST /api/songs**: Crear una nueva canción (requiere rol de admin).
- **PUT /api/songs/:id**: Actualizar una canción (requiere rol de admin).
- **DELETE /api/songs/:id**: Eliminar una canción (requiere rol de admin).

#### Usuarios
- **GET /api/users**: Obtener todos los usuarios (requiere rol de admin).
- **GET /api/users/:id**: Obtener un usuario por ID.
- **GET /api/users/:id/songs**: Obtener las canciones de un usuario.

### Autenticación con JWT
Para acceder a los endpoints protegidos, incluye el token JWT en el encabezado `Authorization`:
```
Authorization: Bearer <tu-token>
```

## Estructura del proyecto
```
.
├── .env
├── .env.example
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.json
├── README.md
├── database/
│   ├── 1-guitartrackrSchema.sql
│   ├── 2-guitartrackrData.sql
│   ├── guitartrackr.mwb
│   ├── guitartrackr.mwb.bak
│   └── conf/
│       └── mycustom.cnf
├── src/
│   ├── index.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth/
│   │   │   └── authController.js
│   │   ├── songs/
│   │   │   └── songsController.js
│   │   └── users/
│   │       └── usersController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── index.js
│   │   ├── songs.js
│   │   └── users.js
│   ├── public/
│   │   ├── css/
│   │   ├── img/
│   │   └── js/
│   ├── routes/
│   │   ├── router.js
│   │   └── api/
│   │       ├── apiRouter.js
│   │       ├── authRouter.js
│   │       ├── songsRouter.js
│   │       └── usersRouter.js
│   ├── services/
│   └── utils/
│       ├── bcrypt.js
│       └── token.js
└── tests/
```

## Tecnologías utilizadas
- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework para construir la API.
- **Sequelize**: ORM para interactuar con MySQL.
- **MySQL**: Base de datos relacional.
- **JWT**: Para autenticación basada en tokens.
- **Docker**: Para contenedores y despliegue.