import { Request, Response } from "express";
import { AlbumService } from "../service/albumService";
import IAlbum from "../models/albumModel";
import { SpotifyApiService } from "../service/spotifyApiService";
import { TokenData, StoredToken } from "../types/types";
export let storedTokens: StoredToken = {
  accessToken: "YOUR_ACCESS_TOKEN",
  refreshToken: "YOUR_REFRESH_TOKEN",
};

export function updateStoredTokens(tokens: TokenData) {
  storedTokens.accessToken = tokens.access_token;
  storedTokens.refreshToken = tokens.refresh_token;
}

export class SpotifyApiController {
  static async searchAlbums(req: Request, res: Response) {
    try {
      let albumName = req.params.albumName;
      let limit: number = Number(req.params.limit);

      console.log(limit);
      if (!limit) {
        limit = 5;
      }

      const albums = await SpotifyApiService.searchAlbums(albumName, limit);
      res.status(200).json(albums);
    } catch (error) {
      console.error("Searching for albums Error:", error);
      res.status(500).send(`Searching for albums Error: ${error}`);
    }
  }
}
