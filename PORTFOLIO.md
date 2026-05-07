# 🎬 Video Manager API - Portafolio

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                        VIDEO MANAGER API                                     ║
║                   REST API for Video Management                                ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  TECNOLOGÍAS                                                                  ║
║  ┌─────────┬──────────┬────────────┐ ┌─────────┬────────────────────┐      ║
║  │   BUN   │  Express │ TypeScript │ │ Prisma  │   PostgreSQL       │      ║
║  │  1.2.22 │   5.2.1  │   6.0.3    │ │  7.8.0  │   Base de datos    │      ║
║  └─────────┴──────────┴────────────┘ └─────────┴────────────────────┘      ║
║  ┌─────────┬──────────┐ ┌─────────┐  ┌─────────┐                            ║
║  │   Zod   │    YAML  │ │ Swagger │  │  OpenAPI│                            ║
║  │  4.4.3  │   spec   │ │   UI    │  │   3.0.3 │                            ║
║  └─────────┴──────────┘ └─────────┘  └─────────┘                            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  ESTRUCTURA                                                                  ║
║                                                                               ║
║  src/                                                                       ║
║  ├── controllers/        ← Manejo de requests                                ║
║  │   ├── category.controller.ts                                            ║
║  │   └── video.controller.ts                                                ║
║  ├── routes/             ← Endpoints Express                                 ║
║  │   ├── category.routes.ts                                                ║
║  │   └── video.routes.ts                                                   ║
║  ├── services/           ← Lógica de negocio                                 ║
║  │   ├── category.service.ts                                               ║
║  │   └── video.service.ts                                                  ║
║  ├── schemas/            ← Validaciones Zod                                  ║
│   │   ├── category.schema.ts                                               │
│   │   └── video.schema.ts                                                  ║
║  ├── middlewares/        ← Manejo de errores                                 ║
│   │   └── error.middleware.ts                                              ║
║  └── lib/                ← Prisma Client                                     ║
│       └── prisma.ts                                                      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  ENDPOINTS                                                                  ║
║                                                                               ║
║  Categories:                                                                ║
║  ┌────────┬────────────────────────┬─────────────────────────────┐          ║
║  │  GET   │  /api/categories      │  Listar categorías          │          ║
║  │  POST  │  /api/categories      │  Crear categoría            │          ║
║  │ DELETE │  /api/categories/:id │  Eliminar categoría         │          ║
║  └────────┴────────────────────────┴─────────────────────────────┘          ║
║                                                                               ║
║  Videos:                                                                    ║
║  ┌────────┬────────────────────────┬─────────────────────────────┐          ║
║  │  GET   │  /api/videos           │  Listar videos              │          ║
║  │  POST  │  /api/videos           │  Crear video                │          ║
║  │ DELETE │  /api/videos/:id       │  Eliminar video             │          ║
║  └────────┴────────────────────────┴─────────────────────────────┘          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  CARACTERÍSTICAS                                                             ║
║                                                                               ║
║  ✓ CRUD Categorías con subcategorías recursivas                             ║
║  ✓ CRUD Videos                                                              ║
║  ✓ Validaciones con Zod                                                     ║
║  ✓ Manejo centralizado de errores                                          ║
║  ✓ Documentación OpenAPI/Swagger en /api-docs                               ║
║  ✓ Clean Architecture                                                       ║
║                                                                               ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  BASE DE DATOS                                                              ║
║                                                                               ║
║  ┌─────────────┐      ┌─────────────┐                                       ║
║  │  Category   │      │    Video    │                                       ║
║  │─────────────│      │─────────────│                                       ║
║  │ id (PK)     │◄─────│ categoryId  │                                       ║
║  │ name        │      │ id (PK)     │                                       ║
║  │ parentId    │─┐    │ title       │                                       ║
║  │             │ │    │ description │                                       ║
║  │ children ───┼─┘    │ videoPath   │                                       ║
║  │             │      │ thumbnail   │                                       ║
║  └─────────────┘      └─────────────┘                                       ║
╠══════════════════════════════════════════════════════════════════════════════╣
║  COMANDOS                                                                   ║
║                                                                               ║
║  bun run dev              → Iniciar servidor                                ║
║  bunx prisma generate     → Generar Prisma Client                           ║
║  bunx prisma db push      → Sincronizar DB                                  ║
║                                                                               ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

## 📸 Screenshot

Para ver la API interactiva:
```bash
bun run dev
```
Luego abre: **http://localhost:3000/api-docs**

---

**Repo**: https://github.com/espiritu1/backend-video-manager-react-ts