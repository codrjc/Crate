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
exports.AlbumController = void 0;
const albumService_1 = require("../service/albumService");
class AlbumController {
    static getAllAlbums(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const albums = yield albumService_1.AlbumService.getAllAlbums();
                res.status(200).json(albums);
            }
            catch (error) {
                console.error("Error getting all albums:", error);
                res.status(500).send(`Error getting all albums: ${error}`);
            }
        });
    }
    static getAlbumById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const album = yield albumService_1.AlbumService.findById(id);
                res.status(200).json(album);
            }
            catch (error) {
                console.error("Error getting album:", error);
                res.status(500).send(`Error getting album: ${error}`);
            }
        });
    }
}
exports.AlbumController = AlbumController;