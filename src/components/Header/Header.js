import React from 'react';
import { Icon } from 'semantic-ui-react';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.title}>Markdown Editor</h1>
    <a
      className={styles.githubLink}
      href="https://github.com/codeKameleon/markdown-editor"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon name="github" size="large" />
    </a>
  </header>
);

export default Header;
