import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { resolvePath } from 'react-router-dom';
import toast from 'react-hot-toast';

export function CreateTodoModal({updateTodos}){
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [deadLine, setDeadline] = useState("");
    const [priority, setPrio] = useState(0);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    async function createTodoClick(){
        const body = {
            "title": title,
            "description": des,
            "deadline": deadLine,
            "priority": parseInt(priority)
        }
        const response = await fetch("http://3.109.211.104:8001/todo", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        });

        setIsOpen(false);
        toast.success("Todo created!");
        setTitle("");
        setDes("");
        setDeadline("");
        setPrio("");
        updateTodos();
    }

    return <div>
        <Button style={{margin:"20px"}} onClick={() => setIsOpen(true)} variant='outlined' color='success'> Create Task</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <Box sx={style}>
                <div style={{backgroundColor: "white"}}>
                        <h1>Add a todo</h1><br/><br/>
                        <TextField value={title} placeholder='Title' onChange={(e) => setTitle(e.target.value)}/><br/><br/>
                        <TextField value={des} placeholder='Description' onChange={(e) => setDes(e.target.value)}/><br/><br/>
                        <TextField value={deadLine} placeholder='Deadline' onChange={(e) => setDeadline(e.target.value)}/><br/><br/>
                        <TextField value={priority} placeholder='Priority' onChange={(e) => setPrio(e.target.value)}/><br/><br/>
                        <Button onClick={createTodoClick} variant='outlined' color='success'>Create</Button>
                </div>
            </Box>
        </Modal>
    </div>
}