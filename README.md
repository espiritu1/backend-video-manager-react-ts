# API Video Manager

API REST para gestión de videos y categorías con soporte para subcategorías recursivas.

## 📋 Descripción

API REST desarrollada con arquitectura limpia (Clean Architecture) que permite gestionar un catálogo de videos organizados en categorías y subcategorías.

### Características

- ✅ CRUD completo de categorías (crear, listar, borrar)
- ✅ CRUD completo de videos (crear, listar, borrar)
- ✅ Soporte para subcategorías recursivas (categorías dentro de categorías)
- ✅ Validación de datos con Zod
- ✅ Manejo centralizado de errores
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Documentación automática con OpenAPI/Swagger

### 📚 Documentación Swagger

Una vez iniciado el servidor, puedes ver la documentación interactiva de la API en:

**Swagger UI**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

También puedes acceder a la especificación en formato JSON:

- **Spec JSON**: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

## 🏗️ Estructura del Proyecto

```
api-video/
├── prisma/
│   └── schema.prisma          # Schema de la base de datos
├── src/
│   ├── controllers/            # Controladores (manejo de requests)
│   │   ├── category.controller.ts
│   │   └── video.controller.ts
│   ├── routes/                 # Rutas de Express
│   │   ├── category.routes.ts
│   │   └── video.routes.ts
│   ├── services/               # Lógica de negocio
│   │   ├── category.service.ts
│   │   └── video.service.ts
│   ├── schemas/                # Validaciones Zod
│   │   ├── category.schema.ts
│   │   └── video.schema.ts
│   ├── middlewares/            # Middlewares de Express
│   │   └── error.middleware.ts
│   ├── lib/                    # Utilidades
│   │   └── prisma.ts          # Cliente de Prisma
│   ├── app.ts                  # Configuración de Express
│   └── server.ts               # Entry point del servidor
├── scripts/                    # Scripts de utilidad
├── package.json
├── tsconfig.json
├── prisma.config.ts
└── .env                        # Variables de entorno
```

## 🛠️ Tecnologías y Versiones

| Tecnología  | Versión | Propósito               |
|------------ |---------|-------------------------|
| Bun         | 1.2.22  | Runtime de JavaScript   |
| Express     | 5.2.1   | Framework web           |
| TypeScript  | 6.0.3   | Lenguaje tipado         |
| Prisma      | 7.8.0   | ORM para base de datos  |
| PostgreSQL  | -       | Base de datos           |
| Zod         | 4.4.3   | Validación de datos     |
| dotenv      | 17.4.2  | Variables de entorno    |

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/espiritu1/backend-video-manager-react-ts.git
cd backend-video-manager-react-ts
```

### 2. Instalar dependencias

```bash
bun install
```

### 3. Configurar base de datos

Crea una base de datos PostgreSQL llamada `api_videos`:

```sql
CREATE DATABASE api_videos;
```

### 4. Configurar variables de entorno

Edita el archivo `.env` con tu configuración de PostgreSQL:

```env
DATABASE_URL="postgresql://tu_usuario:tu_password@localhost:5432/api_videos"
PORT=3000
```

### 5. Sincronizar base de datos

```bash
bunx prisma db push
```

### 6. Generar cliente Prisma

```bash
bunx prisma generate
```

## ▶️ Ejecución

### Iniciar el servidor

```bash
bun run dev
```

El servidor estará disponible en: `http://localhost:3000`

### Verificar funcionamiento

```bash
curl http://localhost:3000/health
```

## 📡 Endpoints

### Health Check

| Método | Endpoint | Descripción                               |
|--------|----------|----------------------------------------   |
| GET    | `/health`| Verificar que el servidor está corriendo  |

### Categorías

| Método  | Endpoint              | Descripción                 |
|-------- |-----------------------|-----------------------------|
| GET     | `/api/categories`     | Listar todas las categorías |
| POST    | `/api/categories`     | Crear una categoría         |
| DELETE  | `/api/categories/:id` | Eliminar una categoría      |

#### Ejemplo crear categoría principal:
```json
POST /api/categories
{
  "name": "React"
}
```

#### Ejemplo crear subcategoría:
```json
POST /api/categories
{
  "name": "Hooks",
  "parentId": 1
}
```

### Videos

| Método | Endpoint                   | Descripción                 |
|--------|----------------------------|-----------------------------|
| GET    | `/api/videos`              | Listar todos los videos     |
| GET    | `/api/videos?categoryId=1` | Listar videos por categoría |
| POST   | `/api/videos`              | Crear un video              |
| DELETE | `/api/videos/:id`          | Eliminar un video           |

#### Ejemplo crear video:
```json
POST /api/videos
{
  "title": "Tutorial useState",
  "description": "Aprende a usar useState en React",
  "videoPath": "/videos/tutorial-usestate.mp4",
  "thumbnailPath": "/thumbnails/usestate.jpg",
  "categoryId": 2
}
```

## 📦 Scripts Disponibles

| Script                 |             Descripción                |
|------------------------|----------------------------------------|
| `bun run dev`          | Iniciar el servidor en modo desarrollo |
| `bun run build`        | Compilar el proyecto                   |
| `bunx prisma generate` | Generar el cliente de Prisma           |
| `bunx prisma studio`   | Abrir Prisma Studio (UI de la DB)      |

## 🔧 Desarrollo

El proyecto sigue una arquitectura limpia con separación clara de responsabilidades:

- **Controllers**: Manejan las solicitudes HTTP y responden al cliente
- **Services**: Contienen la lógica de negocio
- **Schemas**: Definen las validaciones con Zod
- **Routes**: Definen los endpoints de Express
- **Middlewares**: Manejan errores y otras funciones transversales

## 📄 Licencia

MIT License