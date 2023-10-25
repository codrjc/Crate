"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const spotifyApiController_1 = require("../controller/spotifyApiController");
const env = process.env;
const spotifyApiRoutes = express_1.default.Router();
spotifyApiRoutes.get("/album/:albumName/:limit", spotifyApiController_1.SpotifyApiController.searchAlbums);
exports.default = spotifyApiRoutes;
