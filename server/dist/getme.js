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
const token = "BQAvlmBM11N-CqxZfGgnW76Ok7-nSBNDF7WuJnA6c6SO0FDGgM7UpdlF9MtQWCJT8SDwrbMZ9yAFIlCirwcQMu_dLNqyXp7Gn73fgUT8JUdyDI4yo4Kt9cIBmXCQXnwbFLqe5oxweJoqMIBrTMFsxvE-VHlObh223Dz66DPdLRGknIqaMdEMDJHBzN7vfrtHwfDxhmWwyrlwVKcUiItaolTt1GSIjEUs559cCR9xgkBb8fFVznZf4sEm0o3TlDn52RBQ-xeSJIC0dnFO81sWLLgRfFWu5Du7wl2A-XMq15WTRmh9muZNzGxhE9w5dg";
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
        // console.log('The playlist contains these tracks', data.body);
        // console.log('The playlist contains these tracks: ', data.body.items[0].track);
        // console.log("'" + playlistName + "'" + ' contains these tracks:');
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
