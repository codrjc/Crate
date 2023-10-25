import React, { useState } from "react";
import styled from "styled-components";
import AlbumSearchBar from "./AlbumSearchBar";
import axios from "axios";
import AlbumSearchResults from "./AlbumSearchResults";
import { AlbumSearchResult } from "./types";
import AlbumReview from "./AlbumReview";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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

      return;
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  return (
    <PageContainer>
      <SearchBarContainer>
        <AlbumSearchBar fetchAlbums={handleSearchAlbums} />
      </SearchBarContainer>
      <AlbumSearchResults
        searchResults={searchResults}
        onAlbumSelect={(album) => setSelectedAlbum(album)}
      />
      {selectedAlbum ? <AlbumReview album={selectedAlbum} /> : ""}

      {/* {searchResults.length > 0 && (
        <StyledSearchIcon>
          <ArrowDown />
        </StyledSearchIcon>
      )} */}
    </PageContainer>
  );
};

export default Page;
