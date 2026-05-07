import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { createCategorySchema, categoryIdParamSchema } from "../schemas/category.schema";

export const categoryController = {
  async create(req: Request, res: Response) {
    const data = createCategorySchema.parse(req.body);
    const category = await categoryService.create(data);
    res.status(201).json({ success: true, data: category });
  },

  async findAll(req: Request, res: Response) {
    const categories = await categoryService.findAll();
    res.json({ success: true, data: categories });
  },

  async delete(req: Request, res: Response) {
    const { id } = categoryIdParamSchema.parse(req.params);
    await categoryService.delete(id);
    res.status(204).send();
  },
};