import "./components.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "./Todo"
import { CreateTodoModal } from "./CreateTodoModal"
import { Button, TextField } from "@mui/material"
import toast from "react-hot-toast"

export function Dashboard(){
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const [todoList, setTodoList] = useState([]);
    //const [filteredList, setFilteredList] = useState([]);
    const [search, setSearch] = useState("");

    async function getTodos(){
        const response = await fetch("http://3.109.211.104:8001/todos")
        const data = await response.json();
        setTodoList(data);
        console.log(data);
    }

    function logoutClick(){
        localStorage.removeItem("username");
        toast.success("Logged out successful!");
        navigate("/");
    }

    useEffect(() => {
        if(!userName) navigate("/login");
        getTodos();
    }, [])



    return <>
        <div className="dashboard">

            <div className="navBar">
                <h1> Helloooo {userName}! </h1>
                <div><Button onClick={logoutClick} variant="outlined" size="medium" color="error">Logout</Button></div>
            </div>
            <div className="searchBar">
                <TextField placeholder="Search" fullWidth value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>


            <div className="todoList">
                <div>
                    {todoList.map((value, index) => {

                        if(value.title.toLowerCase().includes(search.toLowerCase()))
                        return <Todo key={index} 
                            id={value.id}
                            title={value.title} 
                            des={value.description} 
                            deadline={value.deadline}
                            //created={value.created_at} 
                            user_id={value.user_id}
                            updateTodos={getTodos}/> 
                        }
                    )}
                </div>
                
            </div>
            <div>
                <CreateTodoModal updateTodos={getTodos}/>
            </div>
        </div>
    </>
}
