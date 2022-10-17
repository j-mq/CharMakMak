import React from 'react';
import headerStyles from '../styles/Header.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>CharMak</span> Mak
      </h1>
      <p className={headerStyles.description}>
        Make your own Character Maker for your fans
      </p>
    </div>
  );
};

export default Header;
