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
                <Stopwatch />
                <div className="homeButtons">
                    <Button onClick={loginClick} variant="outlined"> Log_in </Button>
                    <h2>or</h2>
                    <Button onClick={signupClick} variant="outlined"> Sign_Up </Button>
                </div>
            </div>
        </div>
    </>
}

export {Home}

