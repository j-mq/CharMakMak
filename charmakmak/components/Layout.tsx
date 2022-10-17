import React from 'react';
import styles from '../styles/Layout.module.css';
import Nav from './Nav';
import Header from './Header';

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <Header></Header>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
