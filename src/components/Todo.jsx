/* eslint-disable react/prop-types */
import "./components.css";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableSharpIcon from "@mui/icons-material/EventAvailableSharp";
import { useState, useEffect } from "react";

export function Todo({ id, title, des, deadline, priority, is_completed, updateTodos }) {
    const [countdown, setCountdown] = useState("");

    function calculateCountdown(deadline) {
        const dLine = new Date(deadline);
        const now = new Date();
        const diff = dLine - now;

        if (diff <= 0) return "Expired";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    useEffect(() => {
        setCountdown(calculateCountdown(deadline));

        const interval = setInterval(() => {
            setCountdown(calculateCountdown(deadline));
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline]);

    async function deleteClick() {
        try {
            const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
                method: "DELETE"
            });
            const data = await response.json();
            toast.success(data.message);
            updateTodos();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete task.");
        }
    }

    const updateClick = async () => {
        const formattedDeadline = new Date(deadline).toISOString().split("T")[0];
        const validPriority = Math.max(1, Math.min(5, Number(priority)));

        const body = {
            title,
            description: des,
            deadline: formattedDeadline,
            priority: validPriority,
            is_completed: true
        };

        try {
            const response = await fetch(`https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const data = await response.json();
            toast.success(data.message || "Task updated successfully!");
            updateTodos();
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update task.");
        }
    };

    return (
        <div className="todo">
            <div className="todo-container" style={{ textDecoration: is_completed ? "line-through" : "" }}>
                <div>{id}</div>
                <div>{title}</div>
                <div className="countdown">
                    <div>Deadline: {new Date(deadline).toLocaleDateString()}<br/></div>
                    <div className="cntText">({countdown})</div>
                </div>
                <div className="buttons">
                    <button className="updateBtn" onClick={updateClick}>
                        <EventAvailableSharpIcon htmlColor="rgb(0, 255, 21)" />
                    </button>
                    <button className="deleteBtn" onClick={deleteClick}>
                        <DeleteIcon htmlColor="rgb(255, 47, 0)" />
                    </button>
                </div>
            </div>
        </div>
    );
}
