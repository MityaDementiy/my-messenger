import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

const renderMessage = (message) => {
   const getNextId = () => Number(_.uniqueId());

   return <p key={getNextId()}>{message}</p>
};

const App = () => {
   const [messages, setMessages] = useState(['Привет', 'Как дела?']);

   const handleAnswer = () => {
      setMessages([...messages, 'Нормально']);
   }

   return (
      <>
        {messages && messages.map(renderMessage)}
        <button onClick={handleAnswer}>Ответить</button>
      </>
   );
};

ReactDOM.render(
   <App />,
   document.getElementById('root'),
);