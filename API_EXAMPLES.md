# Ejemplos para Postman

**Base URL**: `http://localhost:3000`
**Headers obligatorios**: `Content-Type: application/json`

---

## 📁 CATEGORÍAS

### 1. Crear categoría principal
- **Método**: POST
- **URL**: `http://localhost:3000/api/categories`
- **Body**:
```json
{
  "name": "React"
}
```

### 2. Crear subcategoría
- **Método**: POST
- **URL**: `http://localhost:3000/api/categories`
- **Body**:
```json
{
  "name": "Hooks",
  "parentId": 1
}
```

### 3. Listar todas las categorías
- **Método**: GET
- **URL**: `http://localhost:3000/api/categories`

### 4. Borrar categoría
- **Método**: DELETE
- **URL**: `http://localhost:3000/api/categories/1`
- **Nota**: No puedes borrar si tiene subcategorías o videos

---

## 🎬 VIDEOS

### 1. Crear video
- **Método**: POST
- **URL**: `http://localhost:3000/api/videos`
- **Headers**: `Content-Type: application/json`
- **Body** (todos los campos son obligatorios):
```json
{
  "title": "useState Tutorial",
  "description": "Aprende useState en React - En este video te explico cómo usar el hook useState",
  "videoPath": "C:/videos/react-usestate.mp4",
  "thumbnailPath": "C:/thumbnails/react-usestate.jpg",
  "categoryId": 2
}
```

#### Campos (todos obligatorios):

| Campo           | Tipo    | Descripción |
|-----------------|---------|-------------|
| `title`         | string  | Título del video (máx 255 caracteres) |
| `description`   | string  | Descripción del video (máx 1000 caracteres) |
| `videoPath`     | string  | Ruta del archivo de video |
| `thumbnailPath` | string  | Ruta de la imagen miniatura |
| `categoryId`    | number  | ID de la categoría existente |

### 2. Listar todos los videos
- **Método**: GET
- **URL**: `http://localhost:3000/api/videos`

### 3. Listar videos por categoría
- **Método**: GET
- **URL**: `http://localhost:3000/api/videos?categoryId=2`

### 4. Borrar video
- **Método**: DELETE
- **URL**: `http://localhost:3000/api/videos/1`

---

## ✅ health check

- **Método**: GET
- **URL**: `http://localhost:3000/health`