// src/components/NavBar.tsx
import React from "react";
import styled from "styled-components";

const NavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  text-align: left;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavigationButton = styled.button`
  background-color: transparent;
  border: none;
  color: #fff;
  margin-left: 1rem;
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
      <NavigationContainer>
        <NavigationButton>Library</NavigationButton>
        <NavigationButton>Login</NavigationButton>
      </NavigationContainer>
    </NavBarContainer>
  );
};

export default NavBar;
