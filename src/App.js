import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">Your App Name</Typography>
                    {/* Add more elements for the navigation menu or buttons */}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    <ListItem button>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="About" />
                    </ListItem>
                    {/* Add more navigation items as needed */}
                </List>
            </Drawer>
        </>
    );
}

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
            <Navbar />
            <h1>Chat App</h1>
            <Chat />
        </div>
    );
}

export default App;
