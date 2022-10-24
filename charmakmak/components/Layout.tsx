import React from 'react';
import Meta from './Meta';
import Nav from './Nav';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  display: grid;
  overflow-x: hidden;
  overflow-y: hidden;

  grid-template-areas:
    'nav nav'
    'content editor';
  grid-template-columns: 1fr auto;
  grid-template-rows: 50px 1fr;

  background: ${(props) => props.theme.backgroundLight};
`;

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Meta />
      <Nav />
      {children}
    </Container>
  );
};

export default Layout;
