import express from "express";
import { SpotifyApiController } from "../controller/spotifyApiController";
import { AuthenticationController } from "../controller/authenticationController";
const env = process.env;

const spotifyApiRoutes = express.Router();

spotifyApiRoutes.get("/album/:albumName", SpotifyApiController.searchAlbums);

export default spotifyApiRoutes;
