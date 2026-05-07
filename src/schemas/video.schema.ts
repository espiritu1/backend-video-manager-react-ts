import { z } from "zod";

export const createVideoSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  description: z.string().min(1, "Description is required").max(1000, "Description too long"),
  videoPath: z.string().min(1, "Video path is required"),
  thumbnailPath: z.string().min(1, "Thumbnail path is required"),
  categoryId: z.number().int().positive("Category ID must be a positive integer"),
});

export type CreateVideoDto = z.infer<typeof createVideoSchema>;

export const videoIdParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().int().positive("ID must be a positive integer")
  ),
});

export type VideoIdParam = z.infer<typeof videoIdParamSchema>;

export const videoQuerySchema = z.object({
  categoryId: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive())
    .optional(),
});

export type VideoQuery = z.infer<typeof videoQuerySchema>;