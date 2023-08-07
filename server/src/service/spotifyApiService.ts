const SpotifyWebApi = require("spotify-web-api-node");
import { spotifyDetails, scopes } from "../config/spotify.config";
import { storedTokens } from "../controller/spotifyApiController";
import { AuthenticationService } from "./authentificationService";
export class SpotifyApiService {
  static spotifyApi = new SpotifyWebApi({
    clientId: spotifyDetails.clientId,
    clientSecret: spotifyDetails.clientSecret,
    redirectUri: spotifyDetails.redirectUri,
  });

  static async searchAlbums(albumName: string) {
    try {
      this.spotifyApi.setAccessToken(storedTokens.accessToken);
      const albums = await this.spotifyApi.searchAlbums(albumName, {
        limit: 3,
      });
      return albums;
    } catch (error) {
      console.error("Searching album Error:", error);
      throw error;
    }
  }
}
