/* eslint-disable react/prop-types */
import "./components.css";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableSharpIcon from "@mui/icons-material/EventAvailableSharp";
import { useState, useEffect } from "react";
import { UpdateTodoModal } from "./UpdateTodoModal";

export function Todo({ id, title, des, deadline, priority, is_completed, updateTodos }) {
  const [countdown, setCountdown] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo");
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        toast.error("Failed to fetch todos.");
      }
    };

    fetchTodos();
  }, [todos]);

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
      const response = await fetch(
        `https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todo/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      toast.success(data.message);
      updateTodos();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete task.");
    }
  }

  const openUpdateModal = () => setIsModalOpen(true);
  const closeUpdateModal = () => setIsModalOpen(false);

  return (
    <div className="todo">
      <div className="todo-container" style={{ textDecoration: is_completed ? "line-through" : "" }}>
        <div>{id}</div>
        <div>{title}</div>
        <div className="countdown">
          <div>
            Deadline: {new Date(deadline).toLocaleDateString()}
            <br />
          </div>
          <div className="cntText">({countdown})</div>
        </div>
        <div className="buttons">
          <button className="updateBtn" onClick={openUpdateModal}>
            <EventAvailableSharpIcon htmlColor="rgb(0, 255, 21)" />
          </button>
          <button className="deleteBtn" onClick={deleteClick}>
            <DeleteIcon htmlColor="rgb(255, 47, 0)" />
          </button>
        </div>
      </div>

      <UpdateTodoModal
        open={isModalOpen}
        handleClose={closeUpdateModal}
        currentTodo={{
          id,
          title,
          description: des,
          deadline,
          priority,
          is_completed,
        }}
        onUpdate={updateTodos}
      />
    </div>
  );
}
