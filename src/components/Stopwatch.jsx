import "./components.css"

import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function Stopwatch(){

    const [startPressed, setStartPressed] = useState(false);
    const [millisec, setMillisec] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer;

        if(isRunning){
            timer = setInterval(() => {
                setMillisec(t => t+10);
            }, 10)
            
        }else{
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [isRunning]);


    const TimeString = () => {
        const minute = Math.floor(millisec/60000);
        const secs = Math.floor((millisec%60000)/1000);
        const msec = (millisec%1000)/10;

        return `${String(minute).padStart(2, "0")}:${String(secs).padStart(2, "0")}:${String(msec).padStart(2, "0")}`
    }
    
    const StopPress = () => {
        setMillisec(0);
        setIsRunning(false);
        setStartPressed(false);
    }
    const StartPress = () => {
        setStartPressed(true);
        setIsRunning(true);
    }

    return <>
            <div className="stp">
                <h1>StopWatch</h1><br/>
                <div className="timestring">{TimeString()}</div>
                <div className="stpButtons">

                    {!startPressed ? <Button variant="contained" color="success" onClick={() => StartPress()}>Start</Button> 
                        : <Button variant="contained" color="error" onClick={() => StopPress()}>Stop</Button>}
                </div>
                
            </div>
        </>
}