import { Request, Response } from "express";
import { AlbumService } from "../service/albumService";
import IAlbum from "../models/albumModel";
export class AlbumController {
  static async getAllAlbums(req: Request, res: Response) {
    try {
      const albums: any = await AlbumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      console.error("Error getting all albums:", error);
      res.status(500).send(`Error getting all albums: ${error}`);
    }
  }

  static async getAlbumById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);
      const album: any = await AlbumService.findById(id);
      res.status(200).json(album);
    } catch (error) {
      console.error("Error getting album:", error);
      res.status(500).send(`Error getting album: ${error}`);
    }
  }
}
