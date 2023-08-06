import React, {useState} from "react";
import {Box, Typography, TextField, Button} from "@mui/material";

const Chat = ({selectedContact, messages, setMessages}) => {
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessages = [...messages, {sender: "me", text: newMessage}];
            setMessages(newMessages);
            setNewMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const splitMessageText = (text) => {
        const maxCharsPerLine = 70;
        const lines = [];
        for (let i = 0; i < text.length; i += maxCharsPerLine) {
            lines.push(text.substring(i, i + maxCharsPerLine));
        }
        return lines;
    };

    return (<Box sx={{width: "80%", bg: "white", padding: "16px", background: "#0E1621"}}>
        {selectedContact ? (<>
            <Box sx={{marginBottom: "36px"}}>
                {messages.map((message, index) => (<Box key={index}
                                                        sx={{
                                                            textAlign: message.sender === "me" ? "right" : "left",
                                                            marginBottom: "8px"
                                                        }}>
                    <Typography
                        sx={{
                            backgroundColor: message.text.length > 100 ? "red" : "green",
                            padding: "8px",
                            minWidth: "200px",
                            marginBottom: "8px",
                            borderRadius: "8px",
                            color: "white",
                        }}
                    >
                        {splitMessageText(message.text).map((line, i) => (<React.Fragment key={i}>
                            {line}
                            <br/>
                        </React.Fragment>))}
                    </Typography>
                </Box>))}
            </Box>

            <Box sx={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    label="Type your message"
                    variant="outlined"
                    sx={{flex: 1, marginRight: "16px"}}
                    onKeyDown={handleKeyDown}
                />
                <Button onClick={handleSendMessage} variant="contained" color="primary">
                    Send
                </Button>
            </Box>
        </>) : (<Typography variant="h6" sx={{textAlign: "center", marginTop: "30%"}}>
            Select a contact to start chatting
        </Typography>)}
    </Box>);
};

export default Chat;
