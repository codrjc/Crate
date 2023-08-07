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
exports.getMyData = void 0;
const fs_1 = __importDefault(require("fs"));
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const token = "BQBUNNy3W8J53cLXPaMi2k9_H2kSZyXBFI5YQNWsn9xU56V2Vie1MdgomsFE_5C3Ihyl6eCV0n8kwesHRVjo0i6grs7FkOt2lju5nZ5ZvL66hqSEiXz9TXf3tGJnK0AzYUUOJt9xTc1VAdyL4sJnkL1DAC8aBRzy8mIgb65VQVxA-idPZ9UzzBlPAN8q4MkikYzxf7qzPRfYPzD5UV---33_ZUC8AlRMXOrEcLFnQV23NqbumY0rUPk_mnX3j8IwHpZSVbzt7gRINizSRjZ_Inb8eAkWNwODl5TR59AmAAlW1vU33orNLYe1R1rfvg";
const spotifyApi = new spotify_web_api_node_1.default();
spotifyApi.setAccessToken(token);
//GET MY PROFILE DATA
function getMyData() {
    (() => __awaiter(this, void 0, void 0, function* () {
        const me = yield spotifyApi.getMe();
        // console.log(me.body);
        getUserPlaylists(me.body.id);
    }))().catch((e) => {
        console.error(e);
    });
}
exports.getMyData = getMyData;
// //GET MY PLAYLISTS
function getUserPlaylists(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield spotifyApi.getUserPlaylists(userName);
        console.log("---------------+++++++++++++++++++++++++");
        let playlists = [];
        for (let playlist of data.body.items) {
            console.log(playlist.name + " " + playlist.id);
            let tracks = yield getPlaylistTracks(playlist.id, playlist.name);
            // console.log(tracks);
            const tracksJSON = { tracks };
            let data = JSON.stringify(tracksJSON);
            fs_1.default.writeFileSync(playlist.name + ".json", data);
        }
    });
}
// //GET SONGS FROM PLAYLIST
function getPlaylistTracks(playlistId, playlistName) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield spotifyApi.getPlaylistTracks(playlistId, {
            offset: 1,
            limit: 100,
            fields: "items",
        });
        let tracks = [];
        for (let track_obj of data.body.items) {
            const track = track_obj.track;
            tracks.push(track);
            if (track) {
                console.log(track.name + " : " + track.artists[0].name);
            }
        }
        console.log("---------------+++++++++++++++++++++++++");
        return tracks;
    });
}
