import { prisma } from "../lib/prisma";
import { CreateCategoryDto } from "../schemas/category.schema";
import { createError } from "../middlewares/error.middleware";

export const categoryService = {
  async create(data: CreateCategoryDto) {
    const normalizedName = data.name.trim().toLowerCase();

    if (normalizedName.length === 0) {
      throw createError("El nombre no puede estar vacío", 400);
    }

    if (data.parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: data.parentId },
      });
      if (!parent) {
        throw createError("Categoría padre no encontrada", 404);
      }
    }

    const existing = await prisma.category.findFirst({
      where: {
        name: {
          equals: normalizedName,
          mode: "insensitive",
        },
      },
    });

    if (existing) {
      throw createError(`La categoría '${normalizedName}' ya existe`, 409);
    }

    return prisma.category.create({
      data: {
        name: normalizedName,
        parentId: data.parentId,
      },
    });
  },

  async findAll() {
    const [allCategories, allVideos] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: "asc" },
      }),
      prisma.video.findMany(),
    ]);

    const videosByCategory = new Map<number, typeof allVideos>();
    for (const video of allVideos) {
      const list = videosByCategory.get(video.categoryId) || [];
      list.push(video);
      videosByCategory.set(video.categoryId, list);
    }

    const categoryMap = new Map<number, any>();
    const roots: any[] = [];

    for (const cat of allCategories) {
      categoryMap.set(cat.id, {
        ...cat,
        children: [],
        videos: videosByCategory.get(cat.id) || [],
      });
    }

    for (const cat of allCategories) {
      const node = categoryMap.get(cat.id)!;
      if (cat.parentId) {
        categoryMap.get(cat.parentId)?.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  },

  async delete(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        videos: true,
      },
    });

    if (!category) {
      throw createError("Recurso no disponible, no se encontró la categoría", 404);
    }

    if (category.children.length > 0) {
      throw createError("Cannot delete category with subcategories", 400);
    }

    if (category.videos.length > 0) {
      throw createError("Cannot delete category with videos", 400);
    }

    return prisma.category.delete({
      where: { id },
    });
  },

  async findByParentId(parentId: number) {
    return prisma.category.findMany({
      where: { parentId },
      orderBy: { name: "asc" },
    });
  },

  async findById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        videos: true,
      },
    });

    if (!category) {
      throw createError("Category not found", 404);
    }

    return category;
  },
};