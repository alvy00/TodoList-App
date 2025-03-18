import "./home.css";
import Stopwatch from "./components/Stopwatch";
import { Button } from "@mui/material";
import {
    createTheme,
    responsiveFontSizes,
    ThemeProvider,
  } from '@mui/material/styles';
  import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/ExitToAppTwoTone';
import SignupIcon from '@mui/icons-material/NoteAddTwoTone';
  


function Home(){

    const navigate = useNavigate();

    function loginClick(){
        navigate("/login");
    }
    function signupClick(){
        navigate("/signup");
    }
    
    return <>
        <div className="home">
            <div className="homeBox">
                <Stopwatch /><br/><br/>
                <div className="homeButtons"> 
                    <Button onClick={loginClick} variant="contained" startIcon={<LoginIcon />}> Log_in </Button>
                    <h2>or</h2>
                    <Button onClick={signupClick} variant="contained" startIcon={<SignupIcon />}> Sign_Up </Button>
                </div>
            </div>
        </div>
    </>
}

export {Home}

