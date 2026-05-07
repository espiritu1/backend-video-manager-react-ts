import { prisma } from "../lib/prisma";
import { CreateCategoryDto } from "../schemas/category.schema";
import { createError } from "../middlewares/error.middleware";

export const categoryService = {
  async create(data: CreateCategoryDto) {
    if (data.parentId) {
      const parent = await prisma.category.findUnique({
        where: { id: data.parentId },
      });
      if (!parent) {
        throw createError("Parent category not found", 404);
      }
    }

    const existing = await prisma.category.findFirst({
      where: {
        name: data.name,
        ...(data.parentId ? { parentId: data.parentId } : { parentId: null }),
      },
    });

    if (existing) {
      throw createError("Category with this name already exists in parent", 409);
    }

    return prisma.category.create({
      data: {
        name: data.name,
        parentId: data.parentId,
      },
    });
  },

  async findAll() {
    return prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        videos: true,
      },
      orderBy: { name: "asc" },
    });
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
      throw createError("Category not found", 404);
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