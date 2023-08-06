import React, { useState, useEffect } from "react";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Avatar,
    Modal,
    InputAdornment,
    InputLabel,
    Typography
} from "@mui/material";

const Contacts = ({ contacts, onContactSelect, selectedContact, onAddContact }) => {
    const [newContactName, setNewContactName] = useState("");
    const [newContactPhone, setNewContactPhone] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searched, setSearched] = useState(true); // Search natijasi topilmaganini belgilash uchun

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
        const filtered = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredContacts(filtered);
        setSearched(true); // Malumot topildi
    };

    return (
        <Box sx={{ width: "20%" }}>
            <Box sx={{ padding: "10px", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    value={searchQuery}
                    onChange={(e) => handleSearchContacts(e.target.value)}
                    placeholder="Kontakt qidirish"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{
                        backgroundColor: "#232F3D",
                        border: "none",
                        borderRadius: "30px",
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            color: "white",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "& input::placeholder": {
                            color: "white",
                            margin: "10px",
                        },
                    }}
                    InputProps={{
                        style: { color: "white" },
                    }}
                />
            </Box>
            <Box sx={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}>
                {filteredContacts.length > 0 ? (
                    <List>
                        {filteredContacts.map((contact) => (
                            <ListItem
                                key={contact.id}
                                button
                                onClick={() => onContactSelect(contact)}
                                sx={{
                                    backgroundColor: selectedContact && selectedContact.id === contact.id ? "#2B5178" : "#17212B",
                                    display: "flex",
                                    alignItems: "center",
                                    ":hover": {
                                        backgroundColor: "#212B35",
                                    },
                                }}
                            >
                                {contact.avatarUrl ? (
                                    <Avatar sx={{ marginRight: "16px" }} alt={contact.name} src={contact.avatarUrl} />
                                ) : (
                                    <Avatar sx={{ marginRight: "16px" }}>{contact.name.charAt(0)}</Avatar>
                                )}
                                <ListItemText
                                    primaryTypographyProps={{ color: "white" }}
                                    primary={contact.name}
                                    secondaryTypographyProps={{ color: "lightgrey" }}
                                    secondary={`Mobil: ${contact.phone}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : searched ? (
                    <Typography variant="h6" sx={{ textAlign: "center", marginTop: "5%",marginBottom:"20px" ,color: "red" }}>
                        User orqali qidiruv yolga qoyilmagan !!!
                    </Typography>
                ) : (

                    <Typography variant="h6" sx={{ textAlign: "center", marginTop: "30%", color: "lightgrey" }}>
                        Kontakt tanlang
                    </Typography>
                )}
            </Box>
            <Box sx={{ padding: "16px" }}>
                <Button onClick={() => setIsModalOpen(true)} variant="contained" color="primary" fullWidth>
                    Kontakt qo'shish
                </Button>
            </Box>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#212B35FF",
                        p: 4,
                        minWidth: "300px",
                        borderRadius: "8px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                        label="Yangi kontakt nomini kiriting"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            style: { color: "white" },
                        }}
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
                        label="Yangi kontakt telefonini kiriting"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <InputLabel style={{ color: "lightgrey" }}>+998</InputLabel>
                                </InputAdornment>
                            ),
                            style: { color: "white" },
                        }}
                        sx={{ marginBottom: "16px" }}
                    />

                    <Button onClick={handleAddContact} variant="contained" color="primary" fullWidth>
                        Kontakt qo'shish
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default Contacts;
