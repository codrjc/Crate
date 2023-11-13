import React, { useState } from "react";
import styled from "styled-components";
import { AlbumSearchResult } from "./types";

const AlbumContainer = styled.div``;

const DisplayAlbumContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
`;

const AlbumCard = styled.div`
  width: 150px;
  height: 150px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DisplayAlbumInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: #2f4868;
  text-align: left;
  padding-top: 40px;
`;

const AlbumTitle = styled.div`
  flex: 50;
`;

const AlbumArtists = styled.div`
  flex: 40;
`;

const AlbumReleaseData = styled.div`
  flex: 10;
`;

const InfoLabel = styled.div`
  margin: 10px;
  font-weight: bold;
`;

const InfoData = styled.div`
  margin: 10px;
  text-align: left;
`;

interface AlbumSearchResultsProps {
  searchResults: AlbumSearchResult[];
  onAlbumSelect: (album: AlbumSearchResult) => void; // Callback function
}

const AlbumSearchResults = ({
  searchResults,
  onAlbumSelect,
}: AlbumSearchResultsProps) => {
  const [displayedAlbum, setDisplayedAlbum] = useState<{
    albumName: string;
    artists: string[];
    releaseDate: string;
    id: string;
  } | null>(null);

  const handleAlbumHover = (
    albumName: string,
    artists: string[],
    releaseDate: string,
    id: string
  ) => {
    setDisplayedAlbum({ albumName, artists, releaseDate, id });
  };

  const handleAlbumLeave = () => {
    if (displayedAlbum === null) {
      setDisplayedAlbum(null);
    }
  };

  const handleAlbumClick = (
    albumName: string,
    releaseDate: string,
    artists: string[],
    id: string
  ) => {
    setDisplayedAlbum({ albumName, artists, releaseDate, id });
    const selectedAlbum = searchResults.find((res) => res.id === id);
    if (selectedAlbum) {
      onAlbumSelect(selectedAlbum); // Pass the selected album to the parent component
    }
  };

  return (
    <AlbumContainer>
      <DisplayAlbumContainer>
        {searchResults.map((res) => (
          <AlbumCard
            key={res.id}
            onMouseEnter={() =>
              handleAlbumHover(
                res.albumName,
                res.artists,
                res.releaseDate,
                res.id
              )
            }
            onMouseLeave={handleAlbumLeave}
            onClick={() =>
              handleAlbumClick(
                res.albumName,
                res.releaseDate,
                res.artists,
                res.id
              )
            }
          >
            <img src={res.images[0]} alt={res.albumName} />
          </AlbumCard>
        ))}
      </DisplayAlbumContainer>
      {displayedAlbum && (
        <DisplayAlbumInfo>
          <AlbumTitle>
            <InfoLabel>Album</InfoLabel>
            <InfoData>{displayedAlbum.albumName}</InfoData>
          </AlbumTitle>
          <AlbumArtists>
            <InfoLabel>Artists</InfoLabel>
            <InfoData> {displayedAlbum.artists.join(", ")}</InfoData>
          </AlbumArtists>
          <AlbumReleaseData>
            <InfoLabel>Release</InfoLabel>
            <InfoData>{displayedAlbum.releaseDate.split("-")[0]}</InfoData>
          </AlbumReleaseData>
        </DisplayAlbumInfo>
      )}
    </AlbumContainer>
  );
};

export default AlbumSearchResults;
