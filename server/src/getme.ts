import fs from "fs";
import SpotifyWebApi from "spotify-web-api-node";
const token =
  "BQBUNNy3W8J53cLXPaMi2k9_H2kSZyXBFI5YQNWsn9xU56V2Vie1MdgomsFE_5C3Ihyl6eCV0n8kwesHRVjo0i6grs7FkOt2lju5nZ5ZvL66hqSEiXz9TXf3tGJnK0AzYUUOJt9xTc1VAdyL4sJnkL1DAC8aBRzy8mIgb65VQVxA-idPZ9UzzBlPAN8q4MkikYzxf7qzPRfYPzD5UV---33_ZUC8AlRMXOrEcLFnQV23NqbumY0rUPk_mnX3j8IwHpZSVbzt7gRINizSRjZ_Inb8eAkWNwODl5TR59AmAAlW1vU33orNLYe1R1rfvg";
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
