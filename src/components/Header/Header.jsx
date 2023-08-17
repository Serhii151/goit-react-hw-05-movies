import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &.active {
    color: #f32b4e;
  }
`;

function Header() {
  const location = useLocation();

  return (
    <Nav>
      <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={location.pathname === '/movies' ? 'active' : ''}
      >
        Movies
      </NavLink>
    </Nav>
  );
}

export default Header;