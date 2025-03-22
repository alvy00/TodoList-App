/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import toast from 'react-hot-toast';

export default function UpdateProfileModal({ currentProfile, refreshProfile, setProfile }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(currentProfile.name || "");
    const [email, setEmail] = useState(currentProfile.email || "");
    const [phone, setPhone] = useState(currentProfile.phone || "");
    const [profilePic, setProfilePic] = useState(currentProfile.profile_picture || "");
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    useEffect(() => {
        setName(currentProfile.name || "");
        setEmail(currentProfile.email || "");
        setPhone(currentProfile.phone || "");
        setProfilePic(currentProfile.profile_picture || "");
    }, [currentProfile]);

    const isValidGmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
    const isValidPhone = (phone) => /^\d{11}$/.test(phone);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(!isValidGmail(value));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setPhone(value);
        setPhoneError(!isValidPhone(value));
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 30,
        p: 4,
        backgroundColor: "white",
        borderRadius: "10px",
    };

    const updateProfileClick = async () => {
        if (!name || !email || !phone || emailError || phoneError) {
            toast.error("All fields are required, email must be a valid Gmail, and phone number must be 11 digits!");
            return;
        }

        const username = localStorage.getItem("username");
        if (!username) {
            toast.error("Username not found!");
            return;
        }

        const body = { name, email, phone, profile_picture: profilePic };

        try {
            const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${username}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            setProfile({ ...currentProfile, name, email, phone, profile_picture: profilePic });
            toast.success("Profile updated!");
            setIsOpen(false);
            refreshProfile();
        } catch (error) {
            toast.error("Error updating profile!");
            console.error(error);
        }
    };

    return (
        <div>
            <Button onClick={() => setIsOpen(true)} variant='contained' color='success' size="small">
                Update Profile
            </Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Box sx={style}>
                    <h2>Update Profile</h2><br/>
                    <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        helperText={emailError ? "Please enter a valid Gmail address" : ""}
                    /><br /><br />
                    <TextField
                        fullWidth
                        label="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        error={phoneError}
                        helperText={phoneError ? "Phone number must be exactly 11 digits" : ""}
                    /><br /><br />
                    <TextField fullWidth label="Profile Picture URL" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} /><br /><br />
                    <Button 
                        fullWidth 
                        onClick={updateProfileClick} 
                        variant='contained' 
                        color='primary' 
                        size="small" 
                        disabled={emailError || phoneError}>
                        Save
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
