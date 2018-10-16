import React, { Component } from 'react';
import marked from 'marked';
import exampleText from '../../exampleText';
import styles from './Main.module.scss';

export default class Main extends Component {
  state = {
    text: exampleText
  };

  // Lifecycle Methods
  componentDidMount() {
    const localStorageText = localStorage.getItem('markdownText');

    if (localStorageText) {
      this.setState({ text: localStorageText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    // localStorage enable storing data in the browser
    localStorage.setItem('markdownText', text);
  }

  // Component Functions
  editText = e => {
    /*
      Pick the value entered in the textarea
      and update the state with this value
    */
    const text = e.target.value;

    this.setState({ text });
  };

  renderText = text => {
    // sanitize option set to true avoids HTML being rendered
    const previewText = marked(text, { sanitize: true });
    /*
      Pass this object to the dangerouslySetInnerHTML attribute
      Learn more in the official React doc => https://goo.gl/5MMzxi
    */
    return { __html: previewText };
  };

  // Component rendering
  render() {
    const { text } = this.state;
    return (
      <main className={styles.main}>
        <div className={styles.editor}>
          <h2 className={styles.title}>Editor</h2>

          <textarea
            className={styles.form}
            rows="35"
            value={text}
            onChange={e => this.editText(e)}
          />
        </div>

        <div className={styles.preview}>
          <h2 className={styles.title}>Preview</h2>

          <div
            dangerouslySetInnerHTML={this.renderText(text)}
            className={styles.textPreview}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.action} type="button">
            Edition Mode
          </button>

          <button className={styles.action} type="button">
            Preview Mode
          </button>

          <button className={styles.action} type="button">
            Copy to clipboard
          </button>
        </div>
      </main>
    );
  }
}
