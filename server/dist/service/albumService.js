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
exports.AlbumService = void 0;
const albumModel_1 = __importDefault(require("../models/albumModel"));
class AlbumService {
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const album = yield albumModel_1.default.findById(id);
                return album;
            }
            catch (error) {
                throw new Error("Error fetching album with id " + id + " " + error);
            }
        });
    }
    static getAllAlbums() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const albums = yield albumModel_1.default.find({});
                return albums;
            }
            catch (error) {
                throw new Error("Error fetching albums: " + error);
            }
        });
    }
}
exports.AlbumService = AlbumService;
