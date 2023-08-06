import React, { useState, useEffect } from "react";
import { Box, List, ListItem, ListItemText, TextField, Button, Avatar, Modal, IconButton, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Contacts = ({ contacts, onContactSelect, selectedContact, onAddContact }) => {
    const [newContactName, setNewContactName] = useState("");
    const [newContactPhone, setNewContactPhone] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        handleSearchContacts(searchQuery);
    }, [contacts, searchQuery]);

    const handleAddContact = () => {
        if (newContactName.trim() !== "" && newContactPhone.trim() !== "") {
            let phoneNumber = newContactPhone.trim().replace(/[^0-9]/g, "");
            phoneNumber = `+998 ${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 5)}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`;
            const newContact = {
                id: contacts.length + 1,
                name: newContactName,
                phone: phoneNumber,
            };
            onAddContact(newContact);
            setNewContactName("");
            setNewContactPhone("");
            setIsModalOpen(false);
        }
    };

    const handleSearchContacts = (query) => {
        setSearchQuery(query);
        const filtered = contacts.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()));
        setFilteredContacts(filtered);
    };

    return (
        <Box sx={{ width: "20%", bg: "lightgray" }}>
            <Box sx={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    value={searchQuery}
                    onChange={(e) => handleSearchContacts(e.target.value)}
                    label="Search contact"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "8px" }}
                />
                <IconButton color="primary" onClick={() => setIsModalOpen(true)}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Box sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
                <List>
                    {filteredContacts.map((contact) => (
                        <ListItem
                            key={contact.id}
                            button
                            onClick={() => onContactSelect(contact)}
                            sx={{ backgroundColor: selectedContact && selectedContact.id === contact.id ? "lightblue" : "inherit", display: "flex", alignItems: "center" }}
                        >
                            {contact.avatarUrl ? (
                                <Avatar sx={{ marginRight: "16px" }} alt={contact.name} src={contact.avatarUrl} />
                            ) : (
                                <Avatar sx={{ marginRight: "16px" }}>{contact.name.charAt(0)}</Avatar>
                            )}
                            <ListItemText
                                primary={contact.name}
                                secondary={`Mobile: ${contact.phone}`} // Display "Mobile: " followed by the phone number
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box sx={{ padding: "16px" }}> {/* Container for the fixed "+ button" */}
                <Button onClick={() => setIsModalOpen(true)} variant="contained" color="primary" fullWidth>
                    Add Contact
                </Button>
            </Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bg: "white", p: 4, minWidth: "300px", borderRadius: "8px" }}>
                    <TextField
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        label="Enter new contact name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: "8px" }}
                    />
                    <TextField
                        value={newContactPhone}
                        onChange={(e) => {
                            let phoneNumber = e.target.value.replace(/[^0-9+]/g, "");
                            if (phoneNumber.length > 3) {
                                phoneNumber = phoneNumber.slice(0, 4) + phoneNumber.slice(4, 13).replace(/[^0-9]/g, "").slice(0, 9);
                            }
                            setNewContactPhone(phoneNumber);
                        }}
                        label="Enter new contact phone"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">+998</InputAdornment>,
                        }}
                        sx={{ marginBottom: "8px" }}
                    />

                    <Button onClick={handleAddContact} variant="contained" color="primary" fullWidth>
                        Add Contact
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Contacts;
