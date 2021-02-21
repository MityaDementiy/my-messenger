import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        user: PropTypes.string.isRequired,
    };

    render() {
        return <div className="message"
        style={ { backgroundColor: this.props.user === 'Bot: ' ?
                'light-blue' : 'Aquamarine' } }
><span className="message-sender">{this.props.user}</span>{this.props.text}</div>;
    }
}
