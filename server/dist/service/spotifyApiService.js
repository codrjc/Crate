"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotifyApiService = void 0;
const SpotifyWebApi = require("spotify-web-api-node");
const spotify_config_1 = require("../config/spotify.config");
const spotifyApiController_1 = require("../controller/spotifyApiController");
class SpotifyApiService {
    static searchAlbums(albumName, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.spotifyApi.setAccessToken(spotifyApiController_1.storedTokens.accessToken);
                const albums = yield this.spotifyApi.searchAlbums(albumName, {
                    limit: limit,
                });
                return albums;
            }
            catch (error) {
                console.error("Searching album Error:", error);
                throw error;
            }
        });
    }
}
exports.SpotifyApiService = SpotifyApiService;
SpotifyApiService.spotifyApi = new SpotifyWebApi({
    clientId: spotify_config_1.spotifyDetails.clientId,
    clientSecret: spotify_config_1.spotifyDetails.clientSecret,
    redirectUri: spotify_config_1.spotifyDetails.redirectUri,
});
