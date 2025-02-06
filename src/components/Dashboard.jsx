import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "./Todo";
import { Button } from "@mui/material";
import { CreateTodoModal } from "./CreateTodoModal";


export function Dashboard(){
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const [todoList, setTodoList] = useState([]);

    async function getTodos(){
        const response = await fetch("http://3.109.211.104:8001/todos")
        const data = await response.json();
        setTodoList(data);
    }

    useEffect(() => {
        if(!userName) navigate("/login");
        getTodos();
    }, [])

    return <>
        <div className="dashboard">
            <div className="todoList">
                <div>
                    {todoList.map((value, index) => <Todo key={index} title={value.title}/> )}
                </div>
                
            </div>
            <div>
                <CreateTodoModal updateTodos={getTodos}/>
            </div>
        </div>
    </>
}
