import "./components.css";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function CreateTodoModal({ updateTodos }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [des, setDes] = useState("");
    const [deadLine, setDeadline] = useState("");
    const [priority, setPrio] = useState("");

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 30,
        p: 4,
        backgroundColor: "white",
        borderRadius: "10px",
    };

    async function createTodoClick() {
        if (!title || !des || !deadLine || !priority) {
            toast.error("All fields are required!");
            return;
        }

        const formattedDeadline = new Date(deadLine).toISOString();
        const validPriority = Math.max(1, Math.min(5, parseInt(priority) || 1));

        const body = {
            title: title,
            description: des,
            deadline: formattedDeadline,
            priority: validPriority,
            is_completed: false
        };

        try {
            const response = await fetch("http://3.109.211.104:8001/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            toast.success("Todo created!");
            setTitle("");
            setDes("");
            setDeadline("");
            setPrio("");
            setIsOpen(false);
            updateTodos();
        } catch (error) {
            toast.error("Error creating todo!");
        }
    }

    return (
        <div>
            <Button style={{ margin: "20px" }} onClick={() => setIsOpen(true)} variant='contained' color='success'>
                Create Task
            </Button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Box sx={style}>
                    <h2>Add a To-Do</h2>
                    <TextField fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />
                    <TextField fullWidth label="Description" value={des} onChange={(e) => setDes(e.target.value)} /><br /><br />
                    <TextField fullWidth label="" type="date" value={deadLine} onChange={(e) => setDeadline(e.target.value)} /><br /><br />
                    <TextField fullWidth label="Priority (1-5)" type="number" value={priority} onChange={(e) => setPrio(e.target.value)} /><br /><br />
                    <Button fullWidth onClick={createTodoClick} variant='contained' color='primary'>Create</Button>
                </Box>
            </Modal>
        </div>
    );
}
