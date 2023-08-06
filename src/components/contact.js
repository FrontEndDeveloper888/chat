import React, {useState, useEffect} from "react";
import {
    Box, List, ListItem, ListItemText, TextField, Button, Avatar, Modal, IconButton, InputAdornment
} from "@mui/material";
const Contacts = ({contacts, onContactSelect, selectedContact, onAddContact}) => {
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
                id: contacts.length + 1, name: newContactName, phone: phoneNumber,
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

    return (<Box sx={{width: "20%",}}>
        <Box sx={{padding: "10px", alignItems: "center", justifyContent: "space-between"}}>
            <TextField
                value={searchQuery}
                onChange={(e) => handleSearchContacts(e.target.value)}
                placeholder="Search contact"
                variant="outlined"
                color={"primary"}
                fullWidth
                sx={{
                    backgroundColor: "#232F3D", // Set the background color to red
                    border: "none", borderRadius: "30px", color: "white", // Set the text color to white
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", color: "white",// Hide the outline border
                    }, "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none", // Hide the outline border on hover
                    }, "& input::placeholder": {
                        color: "#557A8C", margin: "10px"// Set the placeholder color to grey
                    },
                }}
            />

        </Box>
        <Box sx={{maxHeight: "calc(95vh - 100px)", overflowY: "auto"}}>
            <List>
                {filteredContacts.map((contact) => (<ListItem
                    key={contact.id}
                    button
                    onClick={() => onContactSelect(contact)}
                    sx={{
                        backgroundColor: selectedContact && selectedContact.id === contact.id ? "#2B5178" : "#17212B",
                        display: "flex",
                        alignItems: "center",
                        ":hover": {
                            backgroundColor: "#212B35", // Set background to transparent on hover
                        },
                    }}
                >
                    {contact.avatarUrl ? (
                        <Avatar sx={{marginRight: "16px"}} alt={contact.name} src={contact.avatarUrl}/>) : (
                        <Avatar sx={{marginRight: "16px"}}>{contact.name.charAt(0)}</Avatar>

                    )}
                    <ListItemText
                        primaryTypographyProps={{color: "white"}} // Set the text color to white
                        primary={contact.name}
                        secondaryTypographyProps={{color: "lightgrey"}}
                        secondary={`Mobile: ${contact.phone}`} // Display "Mobile: " followed by the phone number
                    />
                </ListItem>))}
            </List>
        </Box>
        <Box sx={{padding: "16px"}}> {/* Container for the fixed "+ button" */}
            <Button onClick={() => setIsModalOpen(true)} variant="contained" color="primary" fullWidth>
                Add Contact
            </Button>
        </Box>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "lightgrey",
                    p: 4,
                    minWidth: "300px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 1)", // Add shadow
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <TextField
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    label="Enter new contact name"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "16px" }}
                />
                <TextField
                    value={newContactPhone}
                    onChange={(e) => {
                        let phoneNumber = e.target.value.replace(/[^0-9+]/g, "");
                        if (phoneNumber.length > 3) {
                            phoneNumber =
                                phoneNumber.slice(0, 4) +
                                phoneNumber.slice(4, 13).replace(/[^0-9]/g, "").slice(0, 9);
                        }
                        setNewContactPhone(phoneNumber);
                    }}
                    label="Enter new contact phone"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+998</InputAdornment>,
                    }}
                    sx={{ marginBottom: "16px" }}
                />

                <Button onClick={handleAddContact} variant="contained" color="primary" fullWidth>
                    Add Contact
                </Button>
            </Box>
        </Modal>

    </Box>);
};

export default Contacts;
