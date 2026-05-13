import { prisma } from "../lib/prisma";
import { createError } from "../middlewares/error.middleware";
import { VideoQuery } from "../schemas/video.schema";
import { existsSync, mkdirSync, renameSync, unlinkSync } from "fs";
import { extname, join } from "path";

const BASE_PATH = join(process.cwd(), "assets", "backend");
const VIDEOS_PATH = join(BASE_PATH, "videos");
const IMAGENES_PATH = join(BASE_PATH, "imagenes");
const TEMP_PATH = join(BASE_PATH, "temp");

const getBaseUrl = () => {
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 3000;
  return `http://${host}:${port}`;
};

interface MulterFile {
  fieldname: string;
  originalname: string;
  filename: string;
  path: string;
  mimetype: string;
}

interface CreateVideoInput {
  titulo: string;
  descripcion: string;
  categoria: string;
  subCategoria: string;
  video: MulterFile;
  miniatura: MulterFile;
}

function ensureDirectory(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }
}

function getUniqueFileName(basePath: string, fileName: string): string {
  const ext = extname(fileName);
  let name = fileName.replace(ext, "");
  let finalPath = join(basePath, fileName);
  let counter = 1;

  while (existsSync(finalPath)) {
    finalPath = join(basePath, `${name}_${counter}${ext}`);
    counter++;
  }

  return finalPath.split("/").pop() || fileName;
}

export const videoService = {
  async create(data: CreateVideoInput) {
    const categoryId = parseInt(data.subCategoria);
    const parentCategoryId = parseInt(data.categoria);
    
    if (isNaN(categoryId)) {
      throw createError("El ID de subcategoría debe ser un número válido", 400);
    }

    if (isNaN(parentCategoryId)) {
      throw createError("El ID de categoría debe ser un número válido", 400);
    }

    const subCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    const parentCategory = await prisma.category.findUnique({
      where: { id: parentCategoryId },
    });

    if (!subCategory) {
      throw createError("Subcategoría no encontrada", 404);
    }

    if (!parentCategory) {
      throw createError("Categoría no encontrada", 404);
    }

    if (!data.titulo || !data.descripcion) {
      throw createError("El título y descripción son obligatorios", 400);
    }

    if (!data.video || !data.miniatura) {
      throw createError("El video y la miniatura son obligatorios", 400);
    }

    ensureDirectory(BASE_PATH);
    ensureDirectory(VIDEOS_PATH);
    ensureDirectory(IMAGENES_PATH);

    const videoExt = extname(data.video.originalname);
    const imageExt = extname(data.miniatura.originalname);

    const safeTitle = data.titulo.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÜ]/g, "_");
    
    let videoFileName = getUniqueFileName(VIDEOS_PATH, `${safeTitle}${videoExt}`);
    let imageFileName = getUniqueFileName(IMAGENES_PATH, `${safeTitle}${imageExt}`);

    const finalVideoPath = join(VIDEOS_PATH, videoFileName);
    const finalImagePath = join(IMAGENES_PATH, imageFileName);

    console.log("Guardando video en:", finalVideoPath);
    console.log("Guardando imagen en:", finalImagePath);

    renameSync(data.video.path, finalVideoPath);
    renameSync(data.miniatura.path, finalImagePath);

    const baseUrl = getBaseUrl();
    const videoUrl = `${baseUrl}/videos/${videoFileName}`;
    const thumbnailUrl = `${baseUrl}/imagenes/${imageFileName}`;

    return prisma.video.create({
      data: {
        title: data.titulo,
        description: data.descripcion,
        videoUrl: videoUrl,
        thumbnailUrl: thumbnailUrl,
        categoryId: categoryId,
        parentCategoryId: parentCategoryId,
      },
      include: {
        category: true,
      },
    });
  },

  async findAll(query?: VideoQuery) {
    const conditions: any[] = [];

    if (query?.categoryId) {
      conditions.push({ categoryId: query.categoryId });
    }

    if (query?.search) {
      conditions.push({
        OR: [
          { title: { contains: query.search, mode: "insensitive" } },
          { category: { name: { contains: query.search, mode: "insensitive" } } },
          { category: { parent: { name: { contains: query.search, mode: "insensitive" } } } },
        ],
      });
    }

    const where = conditions.length > 0 ? { AND: conditions } : undefined;
    const isSearch = !!query?.search;

    const videos = await prisma.video.findMany({
      where,
      include: {
        category: {
          include: {
            parent: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (isSearch) {
      return videos.map((v) => ({ id: v.id, title: v.title }));
    }

    return videos;
  },

  async delete(id: number) {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw createError("Video not found", 404);
    }

    try {
      const videoFileName = video.videoUrl.split("/").pop();
      const thumbnailFileName = video.thumbnailUrl.split("/").pop();
      
      if (videoFileName && existsSync(join(VIDEOS_PATH, videoFileName))) {
        unlinkSync(join(VIDEOS_PATH, videoFileName));
      }
      if (thumbnailFileName && existsSync(join(IMAGENES_PATH, thumbnailFileName))) {
        unlinkSync(join(IMAGENES_PATH, thumbnailFileName));
      }
    } catch (error) {
      console.error("Error deleting files:", error);
    }

    return prisma.video.delete({
      where: { id },
    });
  },

  async findById(id: number) {
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!video) {
      throw createError("Video not found", 404);
    }

    return video;
  },

  async findLatest() {
    const video = await prisma.video.findFirst({
      orderBy: { id: "desc" },
      include: {
        category: {
          include: {
            parent: true,
          },
        },
      },
    });

    if (!video) {
      throw createError("No hay videos disponibles", 404);
    }

    return video;
  },
};