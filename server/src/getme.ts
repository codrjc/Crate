import fs from "fs";
import SpotifyWebApi from "spotify-web-api-node";
const token =
  "BQAvlmBM11N-CqxZfGgnW76Ok7-nSBNDF7WuJnA6c6SO0FDGgM7UpdlF9MtQWCJT8SDwrbMZ9yAFIlCirwcQMu_dLNqyXp7Gn73fgUT8JUdyDI4yo4Kt9cIBmXCQXnwbFLqe5oxweJoqMIBrTMFsxvE-VHlObh223Dz66DPdLRGknIqaMdEMDJHBzN7vfrtHwfDxhmWwyrlwVKcUiItaolTt1GSIjEUs559cCR9xgkBb8fFVznZf4sEm0o3TlDn52RBQ-xeSJIC0dnFO81sWLLgRfFWu5Du7wl2A-XMq15WTRmh9muZNzGxhE9w5dg";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

//GET MY PROFILE DATA
export function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    // console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch((e) => {
    console.error(e);
  });
}

// //GET MY PLAYLISTS
async function getUserPlaylists(userName: string) {
  const data = await spotifyApi.getUserPlaylists(userName);

  console.log("---------------+++++++++++++++++++++++++");
  let playlists = [];

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id);

    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks };
    let data = JSON.stringify(tracksJSON);
    fs.writeFileSync(playlist.name + ".json", data);
  }
}

// //GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId: string, playlistName: string) {
  const data = await spotifyApi.getPlaylistTracks(playlistId, {
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
}
