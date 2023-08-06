import React, { useState } from "react";
import { Box } from "@mui/material";
import Contacts from "./contact";
import Chat from "./chat";

const ChatApp = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },  { id: 1, name: "John Doe", phone: "+998 90 123-45-67" },
        { id: 2, name: "Jane Smith", phone: "+998 99 887-76-65" },
        { id: 3, name: "Bob Johnson", phone: "+998 98 765-43-21" },
    ]);

    const [selectedContact, setSelectedContact] = useState(null);

    const [messages, setMessages] = useState({});

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
    };

    const handleAddContact = (newContact) => {
        setContacts([...contacts, newContact]);
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Contacts
                contacts={contacts}
                onContactSelect={handleContactSelect}
                selectedContact={selectedContact}
                onAddContact={handleAddContact}
            />
            <Chat selectedContact={selectedContact} messages={messages[selectedContact?.id] || []} setMessages={(newMessages) => setMessages({ ...messages, [selectedContact.id]: newMessages })} />
        </Box>
    );
};

export default ChatApp;
