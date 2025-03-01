import "./components.css"
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';

export function Todo({id, title, des, deadline, priority, is_completed, updateTodos }){

    async function deleteClick(){
        const response = await fetch(`http://3.109.211.104:8001/todo/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        toast.success(data.message);
        updateTodos();
    }

    const updateClick = async (id) => {
        const formattedDeadline = new Date(deadline).toISOString().split("T")[0]; 
        const validPriority = Math.max(1, Math.min(5, Number(priority))); 
    
        const body = {
            title,
            description: des,
            deadline: formattedDeadline,
            priority: validPriority,
            is_completed: true 
        };
    
        console.log("Sending update request with body:", JSON.stringify(body, null, 2));
    
        try {

            // https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id} 
            const response = await fetch(`http://3.109.211.104:8001/todo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
    
            const data = await response.json();
            console.log("API Response:", data);
    
            if (!response.ok) {
                console.error("Update failed:", JSON.stringify(data, null, 2));
                toast("Failed: " + (data.detail ? data.detail.map(d => d.msg).join(", ") : "Unknown error"));
                return;
            }
    
            toast.success(data.message || "Task updated successfully!");
            updateTodos();
        } catch (error) {
            console.error("Network error:", error);
            toast("Network error while updating task.");
        }
    };
    
    return <>
        <div className="todo">
            <div className="todo-container" style={{textDecoration: is_completed ? "line-through" : ""}}>
                <div>{id}</div>
                <div>{title}</div>
                <div>{deadline}</div>
            </div>
            <div className='buttons'>
                <button className="updateBtn" onClick={() => updateClick(id)}>
                    <EventAvailableSharpIcon htmlColor="rgb(0, 255, 21)"/>
                </button>
                <button className="deleteBtn" onClick={deleteClick}>
                    <DeleteIcon htmlColor="rgb(255, 47, 0)"/></button>
            </div>
        </div>
    </>
}
