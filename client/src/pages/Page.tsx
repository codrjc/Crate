import React, { useState } from "react";
import styled from "styled-components";
import AlbumSearchBar from "../components/AlbumSearchBar";
import axios from "axios";
import AlbumSearchResults from "../components/AlbumSearchResults";
import { AlbumSearchResult } from "../components/types";
import AlbumReview from "../components/AlbumReview";

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const SearchBarContainer = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
`;

const Page: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Array<AlbumSearchResult>>(
    []
  );

  const [selectedAlbum, setSelectedAlbum] = useState<AlbumSearchResult | null>(
    null
  );

  const handleSearchAlbums = async (searchTerm: string) => {
    try {
      let limit = "5";
      const response = await axios.get(
        `http://localhost:5000/spotify/album/${searchTerm}/${limit}`
      );
      let albums = response.data.body.albums;

      const transformedResults = albums.items.map((album: any) => ({
        artists: album.artists.map((artist: any) => artist.name),
        albumName: album.name,
        images: album.images.map((image: any) => image.url),
        releaseDate: album.release_date,
        id: album.id,
      }));

      setSearchResults(transformedResults);

      console.log(transformedResults);

      // Scroll to the search results section
      document
        .getElementById("searchResults")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  const handleSelectAlbum = (album: AlbumSearchResult) => {
    setSelectedAlbum(album);

    // Scroll to the album review section
    document
      .getElementById("albumReview")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <PageContainer>
      <SearchBarContainer>
        <AlbumSearchBar fetchAlbums={handleSearchAlbums} />
      </SearchBarContainer>
      <div id="searchResults">
        <AlbumSearchResults
          searchResults={searchResults}
          onAlbumSelect={handleSelectAlbum}
        />
      </div>
      {selectedAlbum && (
        <div id="albumReview">
          <AlbumReview album={selectedAlbum} />
        </div>
      )}
    </PageContainer>
  );
};

export default Page;
