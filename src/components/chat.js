import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField,  IconButton, InputAdornment } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Chat = ({ selectedContact, messages, setMessages }) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessages = [...messages, { sender: "me", text: newMessage }];
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

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    return (
        <Box sx={{ width: "80%", padding: "15px", background: "#0E1621" }}>
            {selectedContact ? (
                <>
                    <Box
                        sx={{
                            marginBottom: "36px",
                            maxHeight: "calc(100vh - 120px)",
                            overflowY: "auto",
                        }}
                    >
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    textAlign: message.sender === "me" ? "right" : "left",
                                    marginBottom: "8px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        background: "#2B5279",
                                        padding: "8px",
                                        mx: "10px",
                                        minWidth: "auto",
                                        marginBottom: "5px",
                                        borderRadius: "8px",
                                        color: "white",
                                        display: "inline-block",
                                        textAlign: "right",
                                    }}
                                >
                                    {splitMessageText(message.text).map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    ))}
                                </Typography>
                            </Box>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>
                    <Box
                        sx={{
                            position: "fixed",
                            bottom: 5,
                            width: "78%",
                            display: "flex",
                            alignItems: "center",
                            padding: "5px",
                            color: "white",
                        }}
                    >
                        <TextField
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message"
                            variant="outlined"
                            sx={{
                                flex: 1,
                                "& .MuiOutlinedInput-input": {
                                    color: "white",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: "1px solid grey",
                                    },
                                    "&:hover fieldset": {
                                        border: "1px solid grey",
                                    },
                                    "&.Mui-focused fieldset": {
                                        border: "1px solid grey",
                                    },
                                },
                            }}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleSendMessage} color="primary">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </>
            ) : (
                <Typography variant="h6" sx={{ textAlign: "center", marginTop: "30%", color: "lightgrey" }}>
                    Select a contact to start chatting
                </Typography>
            )}
        </Box>
    );
};

export default Chat;
