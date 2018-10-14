import React, { Component } from 'react';
import styles from './Main.module.scss';
import sampleText from '../../sampleText';

export default class Main extends Component {
  state = {
    text: sampleText
  };

  render() {
    const { text } = this.state;
    return (
      <main className={styles.main}>
        <div className={styles.editor}>
          <h2 className={styles.title}>Editor</h2>
          <textarea className={styles.form} rows="35" value={text} />
        </div>

        <div className={styles.preview}>
          <h2 className={styles.title}>Preview</h2>
          <p className={styles.textPreview}>{text}</p>
        </div>

        <div className={styles.actions}>
          <button type="button">Edit</button>
          <button type="button">Expand</button>
          <button type="button">Copy to clipboard</button>
        </div>
      </main>
    );
  }
}
