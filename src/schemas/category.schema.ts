import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  parentId: z.number().int().positive().optional(),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;

export const categoryIdParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().int().positive("ID must be a positive integer")
  ),
});

export type CategoryIdParam = z.infer<typeof categoryIdParamSchema>;