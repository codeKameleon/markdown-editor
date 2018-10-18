import React, { Component } from 'react';
import marked from 'marked';
import exampleText from '../../exampleText';
import styles from './Main.module.scss';

export default class Main extends Component {
  // Lifecycle Methods
  constructor(props) {
    super(props);

    this.state = {
      text: exampleText,
      copied: false
    };

    this.textarea = React.createRef();
    this.copyMessage = React.createRef();
    this.copyText = this.copyText.bind(this);
  }

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

  copyText() {
    const textarea = this.textarea.current;

    textarea.select();
    document.execCommand('copy');

    this.setState({ copied: true });
    // Back to the default state to enable clicking again on the copy button
    this.setDefaultCopyState = setTimeout(() => {
      this.setState(() => ({ copied: false }));
    }, 2000);
  }

  renderCopyMessage() {
    const { copied } = this.state;

    if (copied) {
      return (
        <div className={styles.copySuccess} ref={this.copyMessage}>
          Copied !
        </div>
      );
    }
  }

  renderHTML = text => {
    /*
      sanitize option set to true avoids HTML passed into markdownString
      being rendered
    */
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
            ref={this.textarea}
          />
        </div>

        <div className={styles.preview}>
          <h2 className={styles.title}>Preview</h2>
          <div
            dangerouslySetInnerHTML={this.renderHTML(text)}
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

          <button
            className={styles.action}
            type="button"
            onClick={this.copyText}
          >
            Copy to clipboard
          </button>
        </div>
        {this.renderCopyMessage()}
      </main>
    );
  }
}
