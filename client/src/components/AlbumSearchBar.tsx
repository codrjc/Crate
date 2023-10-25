import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "./Icons/SearchIcon";
import ClearIcon from "./Icons/ClearIcon";

interface AlbumSearchBarProps {
  fetchAlbums: (searchTerm: string) => Promise<void>;
}

interface SearchInputProps {
  issubmitted: boolean;
}

interface SearchInputIconProps {
  issubmitted: boolean;
}

const SearchBarContainer = styled.div`
  border: none;
  position: relative;
`;

const SearchInput = styled.input<SearchInputProps>`
  border-radius: 17px;
  border: 3px solid #2f4868;
  background: ${(props) => (props.issubmitted ? "#f1f1e6" : "#2f4868")};
  color: ${(props) => (props.issubmitted ? "#2f4868" : "#f1f1e6")};
  outline: none;
  padding: 10px 40px 10px 10px;
  font-size: 18px;
  caret-color: ${(props) =>
    props.issubmitted
      ? "transparent"
      : "#f1f1e6"}; // Hide cursor when submitted

  &::placeholder {
    color: rgba(241, 241, 230, 0.7);
  }

  &:focus {
    &::placeholder {
      color: rgba(47, 72, 104, 0.8);
    }
  }
`;

const StyledSearchIcon = styled.svg<SearchInputIconProps>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  fill: #f1f1e6;

  &:hover {
    cursor: pointer;
  }
`;

const StyledDeleteIcon = styled.svg<SearchInputIconProps>`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  fill: #2f4868;

  &:hover {
    cursor: pointer;
  }
`;

const AlbumSearchBar: React.FC<AlbumSearchBarProps> = ({ fetchAlbums }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSubmitted(true);
      await fetchAlbums(searchTerm);
    }
  };

  const handleInputFocus = () => {
    setSubmitted(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSubmitted(false);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="Search for an album..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleSubmit}
        issubmitted={submitted}
        onSelect={handleInputFocus}
      />
      {submitted ? (
        <StyledDeleteIcon issubmitted={submitted} onClick={handleClear}>
          <ClearIcon />
        </StyledDeleteIcon>
      ) : (
        <StyledSearchIcon issubmitted={submitted}>
          <SearchIcon />
        </StyledSearchIcon>
      )}
    </SearchBarContainer>
  );
};

export default AlbumSearchBar;
