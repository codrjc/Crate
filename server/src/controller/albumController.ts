import { Request, Response } from "express";
import { AlbumService } from "../service/albumService";
export class AlbumController {
  // static async getAlbums(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;
  //     let result;
  //     if (id) {
  //       result = await AlbumService.findById(id);
  //     } else {
  //       result = await AlbumService.getAllAlbums();
  //     }
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.error("Error getting albums:", error);
  //     res.status(500).send(`Error getting albums: ${error}`);
  //   }
  // }
}
