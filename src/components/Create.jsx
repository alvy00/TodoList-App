import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function Create(){

    return <>
        <div className='create'>
            <div className='create-text'>
                Create an account
            </div><br/>
            <div>
                <TextField placeholder='Name'/><br/><br/>
                <TextField placeholder='Email'/><br/><br/>
                <TextField placeholder='Phone'/><br/><br/>
                <TextField placeholder='Username'/><br/><br/>
                <TextField type='password' placeholder='Password'/>
            </div><br/>
                <Button variant="outlined" size='medium'>Create Account</Button><br/>
            <div>
                Already have an account? <a href='/login'>Login</a>
            </div>
        
        
        </div>
        
        
    </>
}

export {Create}