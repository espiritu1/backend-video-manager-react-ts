import { z } from "zod";

export const createVideoSchema = z.object({
  titulo: z.string().min(1, "El título es requerido").max(255, "Título muy largo"),
  descripcion: z.string().min(1, "La descripción es requerida").max(1000, "Descripción muy larga"),
  categoria: z.string().min(1, "La categoría es requerida"),
  subCategoria: z.string().optional(),
  video: z.any(),
  miniatura: z.any(),
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