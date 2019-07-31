import React, { Component } from 'react';
import Message from '../Message';
import './Chat.css';

export default class Chat extends Component {
  state = { messages: [], messageInput: '' };

  changeInputMessage = e => {
    this.setState({
      messageInput: e.target.value
    });
  };

  sendMessageOnEnter = e => {
    if (!this.state.messageInput) {
      return;
    }

    if (e.key === 'Enter') {
      this.setState({
        messages: [...this.state.messages, { text: this.state.messageInput }],
        messageInput: ''
      }, () => {
        if (this.refs.messages) {
          this.refs.messages.scrollIntoView(false);
        }
      });
    }
  };

  render() {
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages" ref={'messages'}>
            {this.state.messages.map((item, index) => (
              <Message key={index} text={item.text} />
            ))}
          </div>
        </div>

        <input
          type="text"
          className="input-message"
          value={this.state.messageInput}
          onChange={this.changeInputMessage}
          onKeyPress={this.sendMessageOnEnter}
        />
      </div>
    );
  }
}
