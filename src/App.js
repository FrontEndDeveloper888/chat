import { Button, TextField } from '@mui/material';
import { useState } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    setMessages((prevMessages) => [...prevMessages, message]);
    setMessage('');
  };

  return (
      <div>
        <div>
          <TextField
              label="Message"
              variant="outlined"
              value={message}
              onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Send
          </Button>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
      </div>
  );
}

function App() {
  return (
      <div>
        <h1>Chat App</h1>
        <Chat />
      </div>
  );
}

export default App;
