import React from 'react';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    state = {
        messages: [{ user: "Bot: ", text: "Привет" }, { user: "Bot: ", text: "Как дела?" }],
    };

    handleClick = () => {
        this.setState({ messages: [...this.state.messages, { user: "Human: ", text: "Нормально" }] });
    };

    componentDidUpdate() {
        if (this.state.messages.length % 2 === 1) {
            setTimeout(() =>
                this.setState(
                    { messages: [...this.state.messages, { user: "Bot: ", text: "Не приставай ко мне, я робот" }] }),
                1000);
        }
    }

    render() {
        const { messages } = this.state;
        const renderMessages = messages.map((message, index) => <Message key={index} user={message.user} text={message.text} />);

        return <div>
            {renderMessages}
            <button className="btn btn-primary mt-3" onClick={this.handleClick}>Отправить сообщение</button>
        </div>
    }
}
