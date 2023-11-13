import React, { useState } from "react";
import styled from "styled-components";
import { AlbumSearchResult } from "./types";

const AlbumReviewContainer = styled.div`
  color: #f1f1e6;
  background-color: #2f4868;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const LeftColumn = styled.div`
  width: 400px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
`;

const RightColumn = styled.div`
  width: 500px;
  height: 400px;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 20px;
  padding-right: 20px;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  white-space: nowrap; /* Prevent title from wrapping */
  overflow: hidden; /* Hide any overflow */
  text-overflow: ellipsis; /* Show an ellipsis (...) when text overflows */
  cursor: pointer; /* Add this line to indicate the title is clickable */
  user-select: none; /* Add this line to prevent text selection */
  padding-right: 20px; /* Add some padding to allow space for the scrollbar */
  position: relative; /* Add this line to enable absolute positioning */
`;

const ScrollableTitle = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  padding-bottom: 10px; /* Add some padding to allow space for the scrollbar */
`;

const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const TextInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  margin-top: 10px; /* Add this line to reset margin */
  padding-left: 0; /* Add this line to reset left padding */
  border-radius: 5px;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
  border: none;
  background: none;
  font-size: 16px;
  color: #f1f1e6;
  &::placeholder {
    font-size: 16px;
    color: #f1f1e6;
  }
`;

const SubmitButton = styled.button`
  background-color: #78a1bb;
  margin-top: 10px;
  margin-bottom: 10px;
  align-self: flex-end; /* Position the button at the end (right) */
  color: #f1f1e6;
  border: none;
  border-radius: 10px;

  padding: 10px 20px;
  cursor: pointer;
`;

export interface AlbumReviewProps {
  album: AlbumSearchResult;
}

const AlbumReview = ({ album }: AlbumReviewProps) => {
  const [reviewText, setReviewText] = useState("");

  const handleAddToCrate = async () => {
    console.log(album);

    const data = {
      albumId: album.id,
      userId: "5e506f3c56233d08f79bc8f3",
      review: reviewText,
      imageUrl: album?.images[0],
    };

    console.log(data);

    try {
      const response = await fetch("/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <AlbumReviewContainer>
      <LeftColumn>
        <AlbumImage src={album?.images[0]} alt="Album Cover" />
      </LeftColumn>
      <RightColumn>
        <Title>
          <ScrollableTitle>{album?.albumName}</ScrollableTitle>
        </Title>
        <SubTitle>{album?.artists}</SubTitle>
        <TextInput
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review here ..."
        />{" "}
        <SubmitButton onClick={handleAddToCrate}>Add to the crate</SubmitButton>
      </RightColumn>
    </AlbumReviewContainer>
  );
};

export default AlbumReview;
