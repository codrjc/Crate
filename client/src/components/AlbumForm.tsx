import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1rem;
  flex: 0.5;
  margin-top: 40px;
`;

const FormField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  flex: 1;

  input {
    flex: 1;
    padding: 0.5rem;
    font-size: 16px;
    border-radius: 10px;
  }

  #review-field {
    height: 200px;
  }
`;

const FormInput = styled.input`
  padding: 0.5rem;
  font-size: 16px;
  height: 40px;
  vertical-align: top;
  line-height: 40px;
`;

const SubmitButton = styled.button`
  align-self: flex-end; /* Position the SubmitButton to the right side of the FormContainer */
  width: 20%; /* Set the width to 20% of the FormContainer width */
  height: 35px;
`;

const AlbumForm: React.FC = () => {
  const [albumData, setAlbumData] = useState({
    title: "",
    review: "",
  });

  const handleSubmit = () => {
    console.log("submit handled");

    axios
      .post("/album", albumData)
      .then((res) => {
        console.log("Post successful", res.data);
      })
      .catch((error) => {
        console.error("Error in post request:", error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormContainer>
      <FormField>
        <FormInput
          type="text"
          name="title"
          placeholder="Album Title"
          value={albumData.title}
          onChange={handleInputChange}
        />
      </FormField>
      <FormField>
        <FormInput
          id="review-field"
          type="text"
          name="review"
          placeholder="Description"
          value={albumData.review}
          onChange={handleInputChange}
        />{" "}
      </FormField>
      <SubmitButton type="button" onClick={handleSubmit}>
        Enter
      </SubmitButton>
    </FormContainer>
  );
};

export default AlbumForm;
