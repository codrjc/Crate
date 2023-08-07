import Album from "../models/albumModel";
export class AlbumService {
  static async findById(id: string) {
    try {
      const album = await Album.findById(id);
      return album;
    } catch (error) {
      throw new Error("Error fetching album with id " + id + " " + error);
    }
  }
  static async getAllAlbums() {
    try {
      const albums = await Album.find({});
      return albums;
    } catch (error) {
      throw new Error("Error fetching albums: " + error);
    }
  }
}
