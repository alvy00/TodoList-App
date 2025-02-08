import "./home.css";
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
                <Typography variant="h4">Your journey of a thousand todos <br/>
                    starts here :3 </Typography>
                <div className="homeButtons">
                    <Button onClick={loginClick} variant="outlined"> Login </Button>
                    <h2>or</h2>
                    <Button onClick={signupClick} variant="outlined"> Sign Up </Button>
                </div>
            </div>
        </div>
    </>
}

export {Home}

