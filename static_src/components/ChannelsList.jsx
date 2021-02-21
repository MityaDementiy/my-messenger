import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ChannelsList = (channels) => {
    const renderChannels = channels.map((channel) => {
        return <ListGroup.Item key={channel} className="channels">{channel}</ListGroup.Item>;
    });

    return (
        <ListGroup>
            {renderChannels}
        </ListGroup>
    );
};

export default ChannelsList;