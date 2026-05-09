import { Request, Response } from "express";
import { videoService } from "../services/video.service";
import { videoIdParamSchema, videoQuerySchema } from "../schemas/video.schema";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export const videoController = {
  async create(req: Request, res: Response) {
    const files = req.files as { [fieldname: string]: MulterFile[] };
    
    const titulo = req.body.titulo as string;
    const descripcion = req.body.descripcion as string;
    const categoria = req.body.categoria as string;
    const subCategoria = req.body.subCategoria as string;

    if (!titulo || !descripcion || !categoria || !subCategoria) {
      return res.status(400).json({
        success: false,
        error: "Todos los campos son requeridos"
      });
    }

    if (!files?.video || !files?.miniatura) {
      return res.status(400).json({
        success: false,
        error: "El video y la miniatura son obligatorios"
      });
    }

    const video = await videoService.create({
      titulo,
      descripcion,
      categoria,
      subCategoria,
      video: files.video[0],
      miniatura: files.miniatura[0],
    });

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