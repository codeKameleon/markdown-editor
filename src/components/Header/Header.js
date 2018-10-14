import React from 'react';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>Markdown Editor</h1>

    <a
      href="https://www.github.com/codekameleon/markdown-editor"
      target="_blank"
      rel="noopener noreferrer"
    >
      Github
    </a>
  </header>
);

export default Header;
