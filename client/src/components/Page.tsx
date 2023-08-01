import React from "react";
import styled from "styled-components";
import AlbumForm from "./AlbumForm";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Page: React.FC = () => {
  return (
    <PageContainer>
      <AlbumForm />
    </PageContainer>
  );
};

export default Page;
