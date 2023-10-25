import React from "react";
import styled from "styled-components";
const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 15%;
  margin-bottom: 20px;
  @media all and (max-width: 700px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const NavigationButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavigationButton = styled.button`
  border: none;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar: React.FC = () => {
  return (
    <NavBarContainer>
      <Title>Crate</Title>
      <NavigationButtonContainer>
        <NavigationButton>Library</NavigationButton>
        <NavigationButton>Login</NavigationButton>
      </NavigationButtonContainer>
    </NavBarContainer>
  );
};

export default NavBar;
