import React from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';

import styles from './App.module.scss';

const App = () => (
  <div className={styles.App}>
    <Header />
    <Main />
  </div>
);

export default App;
