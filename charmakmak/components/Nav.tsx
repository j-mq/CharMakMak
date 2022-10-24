import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  grid-area: nav;
  padding: 10px;
  background: ${(props) => props.theme.backgroundDark};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
  }
  ul li a {
    margin: 5px 15px;
  }
`;

const Nav = () => {
  return (
    <NavBar>
      <ul>
        <li>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </NavBar>
  );
};

export default Nav;
