// src/components/AlbumForm.tsx
import React from "react";
import styled from "styled-components";

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
  return (
    <FormContainer>
      <FormField>
        <FormInput type="text" placeholder="Album Title" />
      </FormField>
      <FormField>
        <FormInput id="review-field" type="text" placeholder="Review" />
      </FormField>
      <SubmitButton type="submit">Submit</SubmitButton>
    </FormContainer>
  );
};

export default AlbumForm;
