import Button from '@mui/material/Button';

export function Todo({title, is_completed, priority, deadLine}){
    return <>
        <div className="todo" style={{backgroundColor: priority>5 ? "red":"brgb(220, 217, 217)"}}>
            <div style={{fontSize: "30px", textDecoration: is_completed ? "line-through" : ""}}>
                {is_completed? "✅":"⏳"}
                {title}
            </div>
            <div className='buttons'>
                <Button variant="contained" color="success">Done</Button>
            </div>
            
        </div>
    </>
}
