import "./components.css"
import toast from "react-hot-toast";
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
import { useState } from "react";

export function Todo({id, title, des, deadline, priority, is_completed, updateTodos }){

    async function deleteClick(){
        const response = await fetch(`http://3.109.211.104:8001/todo/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        toast.success(data.message);
        updateTodos();
    }

    async function updateClick(){

        const body = {
            "title": title,
            "description": des,
            "deadline": "2025-02-08T07:01:51.061Z",
            "priority": parseInt(priority),
        };

        const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            toast("Failed to update task!");
            return;
        }
        const data = await response.json();
        toast.success(data.message);
        updateTodos();
    }

    // async function updateClick(id) {
    //     console.log("Updating task with ID:", id);  // Debugging log
    //     if (!id || isNaN(id)) {
    //         console.error("Invalid ID:", id);
    //         toast("Invalid task ID");
    //         return;
    //     }
    
    //     const formattedDeadline = new Date(deadline).toISOString().split("T")[0];  // Ensure YYYY-MM-DD format
    //     const validPriority = Math.max(1, Math.min(5, Number(priority)));  // Ensure priority is between 1-5
    
    //     const body = {
    //         title: String(title),  // Ensure string
    //         description: String(des),
    //         deadline: formattedDeadline,
    //         priority: validPriority,  // Fix missing priority
    //         is_completed: true
    //     };
    
    //     try {
    //         const response = await fetch(`http://3.109.211.104:8001/todo/${Number(id)}`, {  // Convert id to number
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(body)
    //         });
    
    //         const data = await response.json();
    
    //         if (!response.ok) {
    //             console.error("Update failed:", JSON.stringify(data, null, 2));  // Log errors
    //             toast("Failed: " + data.detail.map(d => d.msg).join(", "));
    //             return;
    //         }
    
    //         toast(data.message || "Task updated successfully!");
    //         updateTodos();
    //     } catch (error) {
    //         console.error("Network error:", error);
    //         toast("Network error while updating task.");
    //     }
    // }
    

    
    return <>
        <div className="todo">
            <div className="todo-container" style={{textDecoration: is_completed ? "line-through" : ""}}>
                <div>{id}</div>
                <div>{title}</div>
                <div>{deadline}</div>
            </div>
            <div className='buttons'>
                <button className="updateBtn" onClick={updateClick}>
                    <EventAvailableSharpIcon htmlColor="rgb(0, 255, 21)"/></button>
                <button className="deleteBtn" onClick={deleteClick}>
                    <DeleteIcon htmlColor="rgb(255, 47, 0)"/></button>
            </div>
        </div>
    </>
}
