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
exports.SpotifyApiController = exports.updateStoredTokens = exports.storedTokens = void 0;
const spotifyApiService_1 = require("../service/spotifyApiService");
exports.storedTokens = {
    accessToken: "YOUR_ACCESS_TOKEN",
    refreshToken: "YOUR_REFRESH_TOKEN",
};
function updateStoredTokens(tokens) {
    exports.storedTokens.accessToken = tokens.access_token;
    exports.storedTokens.refreshToken = tokens.refresh_token;
}
exports.updateStoredTokens = updateStoredTokens;
class SpotifyApiController {
    static searchAlbums(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const albumName = req.params.albumName;
                // console.log(albumName);
                const albums = yield spotifyApiService_1.SpotifyApiService.searchAlbums(albumName);
                res.status(200).json(albums);
            }
            catch (error) {
                console.error("Searching for albums Error:", error);
                res.status(500).send(`Searching for albums Error: ${error}`);
            }
        });
    }
}
exports.SpotifyApiController = SpotifyApiController;
