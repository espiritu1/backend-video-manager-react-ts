# API Video Manager

API REST para gestión de videos y categorías con soporte para subcategorías recursivas.

## 📋 Descripción

API REST desarrollada con arquitectura limpia (Clean Architecture) que permite gestionar un catálogo de videos organizados en categorías y subcategorías.

### Características

- ✅ CRUD completo de categorías (crear, listar, borrar)
- ✅ CRUD completo de videos (crear, listar, borrar)
- ✅ Soporte para subcategorías recursivas (categorías dentro de categorías)
- ✅ Búsqueda de videos por título, categoría o subcategoría
- ✅ Búsqueda ligera (solo id y title) para autocompletado
- ✅ Video más reciente y búsqueda por ID
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
HOST=localhost
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

### Health Check y Documentación

| Método | Endpoint | Descripción                               |
|--------|----------|----------------------------------------   |
| GET    | `/health`| Verificar que el servidor está corriendo  |
| GET    | `/openapi.json` | Obtener especificación OpenAPI en JSON |
| GET    | `/videos/:filename` | Servir archivos de video estáticos |
| GET    | `/imagenes/:filename` | Servir archivos de imagen estáticos |

### Categorías

| Método  | Endpoint                        | Descripción                          |
|-------- |----------------------------------|--------------------------------------|
| GET     | `/api/categories`               | Listar todas las categorías          |
| GET     | `/api/categories?parentId=1`    | Listar subcategorías de un padre     |
| POST    | `/api/categories`               | Crear una categoría o subcategoría   |
| DELETE  | `/api/categories/:id`           | Eliminar una categoría               |

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

#### Respuestas al crear categoría

**Éxito (201):**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "react",
    "parentId": null
  }
}
```

**Error (400) - nombre vacío:**
```json
{
  "success": false,
  "error": "El nombre no puede estar vacío"
}
```

**Error (404) - padre no encontrado:**
```json
{
  "success": false,
  "error": "Categoría padre no encontrada"
}
```

**Error (409) - nombre duplicado:**
```json
{
  "success": false,
  "error": "La categoría 'react' ya existe"
}
```

#### Respuestas al eliminar categoría

**Éxito (200):**
```json
{
  "success": true,
  "message": "Categoría eliminada exitosamente"
}
```

**Error (404) - no existe:**
```json
{
  "success": false,
  "error": "Recurso no disponible, no se encontró la categoría"
}
```

**Error (400) - tiene subcategorías:**
```json
{
  "success": false,
  "error": "Cannot delete category with subcategories"
}
```

**Error (400) - tiene videos:**
```json
{
  "success": false,
  "error": "Cannot delete category with videos"
}
```

### Filtro de categorías por padre

`GET /api/categories?parentId=X` devuelve solo los hijos directos de la categoría con ID X:

```bash
GET /api/categories?parentId=10
# Respuesta: [{ "id": 30, "name": "hombre", "parentId": 10 }, { "id": 31, "name": "mujer", "parentId": 10 }]

GET /api/categories?parentId=30
# Respuesta: [] (vacío si no tiene hijos)
```

### Videos

| Método | Endpoint                        | Descripción                              |
|--------|----------------------------------|------------------------------------------|
| GET    | `/api/videos`                   | Listar todos los videos                  |
| GET    | `/api/videos?search=react`      | Buscar videos (devuelve solo id y title) |
| GET    | `/api/videos?categoryId=1`      | Listar videos por categoría              |
| GET    | `/api/videos/latest`            | Obtener el video más reciente            |
| GET    | `/api/videos/:id`               | Obtener un video por ID                  |
| POST   | `/api/videos`                   | Crear un video (con archivos)            |
| DELETE | `/api/videos/:id`               | Eliminar un video                        |

#### Respuestas al eliminar video

**Éxito (200):**
```json
{
  "success": true,
  "message": "Video eliminado exitosamente"
}
```

**Error (404):**
```json
{
  "success": false,
  "error": "Recurso no disponible no se encontro el video para eliminarlo"
}
```

#### Búsqueda de videos

El parámetro `search` permite buscar por título, categoría o subcategoría. Cuando se usa, devuelve solo `id` y `title` para autocompletado:

```bash
# Buscar videos - devuelve lista ligera
GET /api/videos?search=react

# Respuesta: [{ "id": 1, "title": "Tutorial useState" }]

# Sin search - devuelve video completo
GET /api/videos

# Respuesta completa con videoUrl, thumbnailUrl, category, subCategory
```

#### Ejemplo crear video (multipart/form-data):

```bash
POST /api/videos
Content-Type: multipart/form-data

# Campos del formulario:
- titulo: "Tutorial useState"
- descripcion: "Aprende a usar useState en React"
- categoria: "1" (ID de la categoría padre)
- subCategoria: "2" (ID de la subcategoría)
- video: (archivo de video)
- miniatura: (archivo de imagen)
```

#### Respuesta de video (formato completo):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Tutorial useState",
    "description": "Aprende a usar useState en React",
    "category": "react",
    "subCategory": "hooks",
    "videoUrl": "http://localhost:3000/videos/tutorial_usestate.mp4",
    "thumbnailUrl": "http://localhost:3000/imagenes/tutorial_usestate.jpg",
    "createdAt": "2026-05-08T12:00:00.000Z"
  }
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