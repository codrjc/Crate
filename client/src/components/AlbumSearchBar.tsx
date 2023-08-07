import React, { useState } from "react";

interface AlbumSearchBarProps {
  fetchAlbums: (searchTerm: string) => Promise<void>;
}

const AlbumSearchBar: React.FC<AlbumSearchBarProps> = ({ fetchAlbums }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log("here");
    fetchAlbums(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter album name..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Fetcheth ye machine</button>
    </div>
  );
};

export default AlbumSearchBar;
