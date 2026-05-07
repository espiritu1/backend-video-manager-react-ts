import { Request, Response } from "express";
import { videoService } from "../services/video.service";
import { createVideoSchema, videoIdParamSchema, videoQuerySchema } from "../schemas/video.schema";

export const videoController = {
  async create(req: Request, res: Response) {
    const data = createVideoSchema.parse(req.body);
    const video = await videoService.create(data);
    res.status(201).json({ success: true, data: video });
  },

  async findAll(req: Request, res: Response) {
    const query = videoQuerySchema.parse(req.query);
    const videos = await videoService.findAll(query);
    res.json({ success: true, data: videos });
  },

  async delete(req: Request, res: Response) {
    const { id } = videoIdParamSchema.parse(req.params);
    await videoService.delete(id);
    res.status(204).send();
  },
};