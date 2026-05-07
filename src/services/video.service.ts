import { prisma } from "../lib/prisma";
import { CreateVideoDto, VideoQuery } from "../schemas/video.schema";
import { createError } from "../middlewares/error.middleware";

export const videoService = {
  async create(data: CreateVideoDto) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      throw createError("Category not found", 404);
    }

    return prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        videoPath: data.videoPath,
        thumbnailPath: data.thumbnailPath,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });
  },

  async findAll(query?: VideoQuery) {
    const where = query?.categoryId
      ? { categoryId: query.categoryId }
      : undefined;

    return prisma.video.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async delete(id: number) {
    const video = await prisma.video.findUnique({
      where: { id },
    });

    if (!video) {
      throw createError("Video not found", 404);
    }

    return prisma.video.delete({
      where: { id },
    });
  },

  async findById(id: number) {
    const video = await prisma.video.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!video) {
      throw createError("Video not found", 404);
    }

    return video;
  },
};