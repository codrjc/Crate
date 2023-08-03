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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var SpotifyWebApi = require("spotify-web-api-node");
const spotify_config_1 = require("../config/spotify.config");
const spotify_config_2 = require("../config/spotify.config");
const env = process.env;
const router = express_1.default.Router();
const spotifyApi = new SpotifyWebApi({
    clientId: spotify_config_1.spotifyDetails.clientId,
    clientSecret: spotify_config_1.spotifyDetails.clientSecret,
    redirectUri: spotify_config_1.spotifyDetails.redirectUri,
});
router.get("/login", (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(spotify_config_2.scopes));
});
router.get("/callback", (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    if (error) {
        console.error("Callback Error:", error);
        res.send(`Callback Error: ${error}`);
        return;
    }
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
        const access_token = data.body["access_token"];
        const refresh_token = data.body["refresh_token"];
        const expires_in = data.body["expires_in"];
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log("access_token:", access_token);
        console.log("refresh_token:", refresh_token);
        console.log(`Sucessfully retreived access token. Expires in ${expires_in} s.`);
        res.send("Success! You can now close the window.");
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield spotifyApi.refreshAccessToken();
            const access_token = data.body["access_token"];
            console.log("The access token has been refreshed!");
            console.log("access_token:", access_token);
            spotifyApi.setAccessToken(access_token);
        }), (expires_in / 2) * 1000);
    })
        .catch((error) => {
        console.error("Error getting Tokens:", error);
        res.send(`Error getting Tokens: ${error}`);
    });
});
exports.default = router;
