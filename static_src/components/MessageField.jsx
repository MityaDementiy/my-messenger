import React from 'react';
import { Container, Button, InputGroup, FormControl, Row, Col, Navbar } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll';

import Message from './Message.jsx';
import '../styles/styles.css';
import ChannelsList from './ChannelsList.jsx';

export default class MessageField extends React.Component {
    state = {
        messages: [{ user: "Bot: ", text: "Привет" }, { user: "Bot: ", text: "Как дела?" }],
        message: '',
        isBotAnswering: false,
        channels: ['General', 'Developement', 'Random'],
    };

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    handleClick = (message) => {
        this.sendMessage(message);
    };

    handleChange = (event) => {
        this.setState({ message: event.target.value });
    };

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) {
            this.sendMessage(message);
        }
    };

    sendMessage = (message) => {
        this.setState({
            messages: [...this.state.messages, { user: "Human: ", text: message }],
            message: '',
        });
    };

    componentDidMount() {
        this.textInput.current.focus();
    }

    componentDidMount() {
        const messagesAreaId = 'messageArea';
        scroll.scrollToBottom({
            duration: 0,
            containerId: messagesAreaId,
        });
    }

    componentDidUpdate() {
        const lastMessageAuthor = this.state.messages[this.state.messages.length - 1].user;
        if (!this.state.isBotAnswering && lastMessageAuthor === "Human: ") {
            this.setState({ isBotAnswering: true });
            setTimeout(() =>
                this.setState(
                    { messages: [...this.state.messages, { user: "Bot: ", text: "Не приставай ко мне, я робот" }], isBotAnswering: false }),
                1000);
        }
        
        const messagesAreaId = 'messageArea';
        scroll.scrollToBottom({
            duration: 0,
            containerId: messagesAreaId,
        });
    }

    render() {
        const { messages, channels } = this.state;
        const renderMessages = messages.map((message, index) => <Message key={index} user={message.user} text={message.text} />);

        return (
            <>
                <Container>
                    <Row className="mb-3">
                        <Col className="col-12">
                            <Navbar bg="light">
                                <Navbar.Brand href="#">Messenger</Navbar.Brand>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
                <Container className="layout">
                    <Row className="w-100 mb-3 vh-100">
                        <Col md={3} >{ChannelsList(channels)}</Col>
                        <Col md={9} className="h-100">
                            <div id="messageArea" className="message-field mb-3">{renderMessages}</div>
                            <Col className="col-12">
                                <div style={{ width: '100%', display: 'flex' }}>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Type your message"
                                            aria-label="Type your message"
                                            aria-describedby="basic-addon2"
                                            name="message"
                                            fullWidth={true}
                                            hintText="Введите сообщение"
                                            style={{ fontSize: '22px' }}
                                            onChange={this.handleChange}
                                            value={this.state.message}
                                            onKeyUp={(event) => this.handleKeyUp(event, this.state.message)}
                                            ref={this.textInput}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="primary" onClick={() => this.handleClick(this.state.message)}>Button</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
                {/* <Container>
                    <Row>
                        <Col className="col-12">
                            <div style={{ width: '100%', display: 'flex' }}>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Type your message"
                                        aria-label="Type your message"
                                        aria-describedby="basic-addon2"
                                        name="message"
                                        fullWidth={true}
                                        hintText="Введите сообщение"
                                        style={{ fontSize: '22px' }}
                                        onChange={this.handleChange}
                                        value={this.state.message}
                                        onKeyUp={(event) => this.handleKeyUp(event, this.state.message)}
                                        ref={this.textInput}
                                    />
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={() => this.handleClick(this.state.message)}>Button</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                </Container> */}
            </>
        );
    }
}
