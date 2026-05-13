# Ejemplos para Postman

**Base URL**: `http://localhost:3000`

---

## 📁 CATEGORÍAS

### 1. Crear categoría principal
- **Método**: POST
- **URL**: `http://localhost:3000/api/categories`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "name": "React"
}
```
- **Nota**: El nombre se convierte automáticamente a minúsculas. Si "react" ya existe, devolverá error 409.

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
- **Nota**: Si "hooks" ya existe en la categoría "react", devolverá error 409.

### 3. Listar todas las categorías
- **Método**: GET
- **URL**: `http://localhost:3000/api/categories`

**Respuesta de ejemplo**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "react",
      "parentId": null,
      "children": [
        { "id": 2, "name": "hooks", "parentId": 1 }
      ],
      "videos": []
    }
  ]
}
```

### 4. Borrar categoría
- **Método**: DELETE
- **URL**: `http://localhost:3000/api/categories/1`
- **Nota**: No puedes borrar si tiene subcategorías o videos

---

## 🎬 VIDEOS (CON ARCHIVOS)

### 1. Crear video con archivos
- **Método**: POST
- **URL**: `http://localhost:3000/api/videos`
- **Tipo**: `multipart/form-data` (NO JSON)
- **Campos del formulario**:

| Campo | Tipo | Descripción | Obligatorio |
|-------|------|--------------|--------------|
| `titulo` | text | Título del video | ✅ Sí |
| `descripcion` | text | Descripción del video | ✅ Sí |
| `categoria` | text | ID de categoría principal | ✅ Sí |
| `subCategoria` | text | ID de subcategoría | ✅ Sí |
| `video` | file | Archivo de video (mp4, webm) | ✅ Sí |
| `miniatura` | file | Imagen para miniatura (jpg, png) | ✅ Sí |

**Ejemplo de formulario**:
```
titulo: "Tutorial useState"
descripcion: "Aprende useState en React"
categoria: "1"
subCategoria: "2"
video: [seleccionar archivo]
miniatura: [seleccionar archivo]
```

**Respuesta de ejemplo**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Tutorial useState",
    "description": "Aprende useState en React",
    "videoPath": "/home/fere/proyect/api-video/assets/backend/videos/tutorial_usestate.mp4",
    "thumbnailPath": "/home/fere/proyect/api-video/assets/backend/imagenes/tutorial_usestate.jpg",
    "categoryId": 2,
    "parentCategoryId": 1,
    "createdAt": "2026-05-08T12:00:00.000Z"
  }
}
```

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

## ⚠️ ERRORES COMUNES

### Categorías duplicadas
Si intentas crear "React" cuando ya existe:
```json
{
  "success": false,
  "error": "La categoría 'react' ya existe"
}
```

### Subcategorías duplicadas
Si intentas crear "Hooks" cuando ya existe en "react":
```json
{
  "success": false,
  "error": "La subcategoría 'hooks' ya existe en la categoría 'react'"
}
```

### Categoría o subcategoría no encontrada
```json
{
  "success": false,
  "error": "Categoría padre no encontrada"
}
```

---

## ✅ HEALTH CHECK

- **Método**: GET
- **URL**: `http://localhost:3000/health`

**Respuesta**:
```json
{
  "status": "ok"
}
```