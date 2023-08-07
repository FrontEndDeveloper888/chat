import React, {useState, useRef, useEffect} from "react";
import {Box, Typography, TextField, IconButton, InputAdornment} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {Avatar} from "@mui/material";


const Chat = ({selectedContact, messages, setMessages}) => {
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth", block: "end"});
        }
    };

    return (<Box sx={{width: "80%", padding: "0", background: "#0E1621"}}>
        <Box sx={{
            height: "83px",
            display: "flex",
            alignItems: "center",
            padding: "0 50px",
            background: "#232F3DFF",
            border: "1px solid #313131"
        }}>
            {selectedContact && selectedContact.avatarUrl ? (
                <Avatar src={selectedContact.avatarUrl} sx={{marginRight: "16px"}}/>) : (<Avatar
                sx={{marginRight: "16px"}}>{selectedContact ? selectedContact.name.charAt(0) : null}</Avatar>)}
            {selectedContact ? (<Typography variant="h5" color="white">
                {selectedContact.name}
            </Typography>) : (<Typography variant="h5" color="white">
                Kontakt tanlang
            </Typography>)}
        </Box>


        {selectedContact ? (<>
            <Box
                sx={{
                    marginBottom: "36px", maxHeight: "calc(100vh - 170px)", overflowY: "auto",
                    '&::-webkit-scrollbar': {width: '0px'}
            }}>
                {messages.map((message, index) => (<Box
                    key={index}
                    sx={{
                        textAlign: message.sender === "me" ? "right" : "left", margin: "8px 0",
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
                            textAlign: "left",
                        }}
                    >
                        {splitMessageText(message.text).map((line, i) => (<React.Fragment key={i}>
                            {line}
                            <br/>
                        </React.Fragment>))}
                    </Typography>
                </Box>))}
                <div ref={messagesEndRef}/>
            </Box>
            <Box
                sx={{
                    position: "fixed",
                    bottom: 5,
                    width: "79%",
                    display: "flex",
                    alignItems: "center",
                    padding: "5px",
                    color: "white",
                }}
            >
                <TextField
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Xabar jonatish..."
                    variant="outlined"
                    sx={{
                        flex: 1, "& .MuiOutlinedInput-input": {
                            color: "white",
                        }, "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "1px solid grey",
                            }, "&:hover fieldset": {
                                border: "1px solid grey",
                            }, "&.Mui-focused fieldset": {
                                border: "1px solid grey",
                            },
                        },
                    }}
                    onKeyDown={handleKeyDown}
                    InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <IconButton onClick={handleSendMessage} color="primary">
                                <SendIcon/>
                            </IconButton>
                        </InputAdornment>)
                    }}
                />
            </Box>
        </>) : (<Typography variant="h6" sx={{textAlign: "center", marginTop: "30%", color: "lightgrey"}}>
            Chat boshlash uchun kontakt tanlang
        </Typography>)}
    </Box>);
};

export default Chat;
