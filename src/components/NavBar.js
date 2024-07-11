import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #f0f0f0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  a {
    margin-right: 20px;
    text-decoration: none;
    color: #333;
    font-weight: bold;

    &:hover {
      color: #007bff;
    }
  }
`;

const NavBar = () => {
    return (
        <Nav>
            <h2>Repo Analyzer</h2>
            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/help">Help</Link>
            </NavLinks>
        </Nav>
    );
};

export default NavBar;
