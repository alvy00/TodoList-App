import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Login(){
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");

    async function handleLogin(){
        
        const body = {
            "username": username,
            "password": pass
        };
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
            alert("Logged in");
            navigate("/dashboard");
        }else{
            alert(data["detail"])
            return;
        }
    }

    return <>
        <div className='login'>
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
        
        
    </>
}