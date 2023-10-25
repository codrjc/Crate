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
exports.AuthenticationService = void 0;
let SpotifyWebApi = require("spotify-web-api-node");
const spotify_config_1 = require("../config/spotify.config");
class AuthenticationService {
    static getAuthorizationUrl() {
        return this.spotifyApi.createAuthorizeURL(spotify_config_1.scopes);
    }
    static handleCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.retrieveTokens(code);
                this.setupTokenRefresh(tokens);
                return tokens;
            }
            catch (error) {
                console.error("Callback Handling Error:", error);
                throw error;
            }
        });
    }
    static retrieveTokens(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.spotifyApi.authorizationCodeGrant(code);
            const access_token = data.body["access_token"];
            const refresh_token = data.body["refresh_token"];
            const expires_in = data.body["expires_in"];
            this.spotifyApi.setAccessToken(access_token);
            this.spotifyApi.setRefreshToken(refresh_token);
            return {
                access_token,
                refresh_token,
                expires_in,
            };
        });
    }
    static setupTokenRefresh(tokens) {
        const { expires_in } = tokens;
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.spotifyApi.refreshAccessToken();
                const new_access_token = data.body["access_token"];
                console.log("The access token has been refreshed!");
                console.log("access_token:", new_access_token);
                this.spotifyApi.setAccessToken(new_access_token);
            }
            catch (error) {
                console.error("Token Refresh Error:", error);
            }
        }), (expires_in / 2) * 1000);
    }
}
exports.AuthenticationService = AuthenticationService;
AuthenticationService.spotifyApi = new SpotifyWebApi({
    clientId: spotify_config_1.spotifyDetails.clientId,
    clientSecret: spotify_config_1.spotifyDetails.clientSecret,
    redirectUri: spotify_config_1.spotifyDetails.redirectUri,
});
