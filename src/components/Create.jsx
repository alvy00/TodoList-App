import "./components.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export function Create(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [cpass, setCpass] = useState("");

    async function handleCreateClick(){
        
        if(pass != cpass){
            toast.error("Password not matching");
            return;
        }

        const body = {
            "name": name,
            "email": email,
            "phone": phone,
            "username": username,
            "password": pass,
            "profile_picture": ""
        };

        // https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/register 
        const response = await fetch("http://3.109.211.104:8001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        toast(data.message);
        setName("");
        setUsername("");
        setEmail("");
        setPass("");
        setCpass("");
        setPhone("");

        navigate("/login");
    }

    return <>
        <div className="create">
            <div className="create-container">
                <div className="create-text">
                    Create an account
                </div><br/>
                <div>
                    <TextField placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /><br/><br/>
                    <TextField placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
                    <TextField placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} /><br/><br/>
                    <TextField placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br/><br/>
                    <TextField type='password' placeholder='Password' value={pass} onChange={(e) => setPass(e.target.value)} /><br/><br/>
                    <TextField type='password' placeholder='Confirm Password' value={cpass} onChange={(e) => setCpass(e.target.value)} />
                </div><br/>
                    <Button variant="outlined" size='medium' color="success" onClick={handleCreateClick}>Create Account</Button><br/>
                <div>
                    Already have an account? <a href='/login'>Login</a>
                </div>
            </div>    
        
        </div>
        
        
    </>
}