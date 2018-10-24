import React, { Component } from 'react';
import marked from 'marked';
import { Form, TextArea, Button, Icon, Popup } from 'semantic-ui-react';
import cn from 'classnames';
import exampleText from '../../exampleText';
import styles from './Main.module.scss';

export default class Main extends Component {
  // Lifecycle Methods
  constructor(props) {
    super(props);

    this.state = {
      text: exampleText,
      copied: false,
      editMode: true,
      previewMode: false,
      viewportWidth: window.innerWidth
    };

    this.textarea = React.createRef();
    this.copyMessage = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
    const localStorageText = localStorage.getItem('markdownText');

    if (localStorageText) {
      this.setState({ text: localStorageText });
    }
  }

  componentDidUpdate() {
    const { text } = this.state;
    // localStorage enables storing data in the browser
    localStorage.setItem('markdownText', text);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
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

  copyText = () => {
    const textarea = this.textarea.current.ref;

    textarea.select();
    document.execCommand('copy');

    this.setState({ copied: true });
    // Back to the default state to enable clicking again on the copy button
    this.setDefaultCopyState = setTimeout(() => {
      this.setState(() => ({ copied: false }));
    }, 2000);
  };

  handleWindowSizeChange = () => {
    this.setState({ viewportWidth: window.innerWidth });
  };

  toggleMode = () => {
    const { previewMode, editMode } = this.state;
    this.setState({
      previewMode: !previewMode,
      editMode: !editMode
    });
  };

  renderCopyMessage() {
    const { copied } = this.state;

    if (copied) {
      return (
        <div className={styles.copySuccess} ref={this.copyMessage}>
          <Icon name="copy" size="large" />
          Copied !
        </div>
      );
    }
  }

  renderActions() {
    const { editMode, previewMode, viewportWidth } = this.state;
    const isMobile = viewportWidth <= 768;

    // Edit Mode (mobile)
    if (editMode && isMobile) {
      return (
        <div className={styles.actions}>
          <Popup
            trigger={
              <Button
                className={styles.action}
                onClick={this.toggleMode}
                circular
                icon="eye"
              />
            }
            position="left center"
            content="Preview"
          />

          <Popup
            trigger={
              <Button
                className={styles.action}
                onClick={this.copyText}
                circular
                icon="copy"
              />
            }
            position="left center"
            content="Copy"
          />
        </div>
      );
    }

    // Preview Mode (mobile)
    if (previewMode && isMobile) {
      return (
        <div className={styles.actions}>
          <Popup
            trigger={
              <Button
                className={styles.action}
                circular
                icon="pencil"
                onClick={this.toggleMode}
              />
            }
            position="left center"
            content="Edit"
          />
        </div>
      );
    }

    // Default Mode (desktop)
    return (
      <div className={styles.actions}>
        <Popup
          trigger={
            <Button
              className={styles.action}
              onClick={this.copyText}
              circular
              icon="copy"
            />
          }
          position="left center"
          content="Copy"
        />
      </div>
    );
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
    const { text, previewMode } = this.state;

    return (
      <main className={styles.main}>
        <div className={styles.editor}>
          <div className={styles.headline}>
            <h2 className={styles.title}>Editor</h2>
          </div>

          <Form className={styles.form}>
            <TextArea
              className={styles.markdownEditor}
              autoHeight
              value={text}
              onChange={e => this.editText(e)}
              ref={this.textarea}
            />
          </Form>
        </div>

        <div
          className={cn(styles.preview, { [styles.showPreview]: previewMode })}
        >
          <div className={styles.headline}>
            <h2 className={styles.title}>Preview</h2>
          </div>
          <div
            dangerouslySetInnerHTML={this.renderHTML(text)}
            className={styles.htmlPreview}
          />
        </div>
        {this.renderActions()}
        {this.renderCopyMessage()}
      </main>
    );
  }
}
