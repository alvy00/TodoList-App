import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Login(){

    return <>
        <div className='login'>
            <div className='login-text'>
                Login
            </div><br/>
            <div>
                <TextField placeholder='Username'/><br/><br/>
                <TextField type='password' placeholder='Password'/>
            </div><br/>
                <Button variant="outlined" size='medium'>Login</Button><br/>
            <div>
                Do not have an account? <a href='/signup'>Sign Up</a>
            </div>
        
        
        </div>
        
        
    </>
}

export {Login}