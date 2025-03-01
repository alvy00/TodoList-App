import "./components.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export function Login(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    async function handleLogin(){
        
        const body = {
            "username": username,
            "password": pass
        };

        // https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/login 
        const response = await fetch("http://3.109.211.104:8001/login", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if(data["access_token"]){
            localStorage.setItem("username", username);
            toast.success("Logged in");
            navigate("/dashboard");
        }else{
            toast.error(data["detail"])
            return;
        }
    }

    return <>
        <div className='login'>
            <div className="login-container">
                <div className='login-text'>
                        Login
                </div><br/>
                <div>
                    <TextField placeholder='Username' value={username} onChange={(e) => {setUsername(e.target.value)}}/><br/><br/>
                    <TextField type='password' placeholder='Password' value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                </div><br/>
                    <Button variant="outlined" size='medium' onClick={handleLogin}>Login</Button><br/>
                <div>
                    Do not have an account? <a href='/signup'>Sign Up</a>
                </div>
            </div>
            
        </div>
        
        
    </>
}