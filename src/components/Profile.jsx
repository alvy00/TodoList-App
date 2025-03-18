/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import "./components.css"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Profile(){
    //const [profile, setProfile] = useState(null);
    const [profile, setProfile] = useState({
        name: "abcd",
        email: "abcd@gmail.com",
        phone: "01876576323",
        username: "abcd007",
        profile_picture: ""
    });

    const profilePic = profile.profile_picture?.trim() ? profile.profile_picture : "https://www.w3schools.com/w3images/avatar2.png";
    const navigate = useNavigate();

    function dashboardBtn(){
        navigate("/dashboard");
    }

    useEffect(() => {
        async function fetchProfile() {
            try {
                // http://3.109.211.104:8001/profile/${username}
                // https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${username}
                const res = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/profile/${username}`);
                const data = await res.json();
                setProfile(data);

            } catch (err) {
                toast.error("Failed to load profile");
            }
        }

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Error loading profile</div>;
    }

    return <>
        <div className="profile">
            <div className="profile-container">
                <h1>User Profile</h1><br/>
                <div className="profile-card">
                    <img
                        src={profilePic}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <div className="profile-details">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone}</p>
                        <p><strong>Username:</strong> {profile.username}</p>
                    </div>
                </div><br/>
                <div className="profileBtns">
                    <Button variant="contained" size="small" color="success">Update Profile</Button>
                    <Button onClick={dashboardBtn} variant="contained" size="small">Back to Dashboard</Button>
                </div>
            </div>
        </div>
    </>
}