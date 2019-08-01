import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';

export default class Chat extends Component {
  state = { messages: [], messageInput: '' };
  messagesWrapper = React.createRef();

  changeInputMessage = e => {
    this.setState({
      messageInput: e.target.value
    });
  };

  sendMessageOnEnter = e => {
    const { messageInput } = this.state;

    if (e.key === 'Enter' && messageInput) {
      this.setState(
        prevState => ({
          messages: [...prevState.messages, { text: prevState.messageInput }],
          messageInput: ''
        }),
        () => {
          if (this.messagesWrapper.current) {
            this.messagesWrapper.current.scrollIntoView(false);
          }
        }
      );
    }
  };

  render() {
    const { messages, messageInput } = this.state;

    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages" ref={this.messagesWrapper}>
            {messages.map((item, index) => (
              <Message key={index} text={item.text} />
            ))}
          </div>
        </div>

        <input
          type="text"
          className="input-message"
          value={messageInput}
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
        />
      </div>
    );
  }
}
