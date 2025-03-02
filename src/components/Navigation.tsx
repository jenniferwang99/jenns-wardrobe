import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSidebar } from '../context/SidebarContext';

interface SidebarProps {
  $isOpen: boolean;
}

const Sidebar = styled.nav<SidebarProps>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 250px;
  background-color: white;
  transform: translateX(${props => (props.$isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  padding: 2rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.button<SidebarProps>`
  position: fixed;
  left: ${props => (props.$isOpen ? '250px' : '0')};
  top: 1rem;
  background-color: #ffd1dc;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #9b6b9d;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  z-index: 100;

  &:hover {
    background-color: #d4a5d6;
    color: white;
  }
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #9b6b9d;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
  text-transform: lowercase;

  &:hover {
    background-color: #ffd1dc;
    color: white;
  }
`;

const Title = styled.h1`
  color: #9b6b9d;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-transform: lowercase;
`;

export const Navigation: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <Sidebar $isOpen={isSidebarOpen}>
        <Title>✨ jenn's wardrobe</Title>
        <NavLink to="/">view all</NavLink>
        <NavLink to="/upload">add new item</NavLink>
      </Sidebar>
      <ToggleButton onClick={toggleSidebar} $isOpen={isSidebarOpen}>
        {isSidebarOpen ? '←' : '→'}
      </ToggleButton>
    </>
  );
};
