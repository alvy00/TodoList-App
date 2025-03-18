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

        // https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos 
        // http://3.109.211.104:8001/todos
        const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos")
        const data = await response.json();
        setTodoList(data);
    }

    function logoutClick(){
        localStorage.removeItem("username");
        toast.success("Logged out successful!");
        navigate("/");
    }
    function profileClick(){
        navigate("/profile");
    }

    useEffect(() => {
        if(!userName) navigate("/login");
        getTodos();
    }, [])



    return <>
        <div className="dashboard">

            <div className="navBar">
                <h1> Helloooo {userName}! </h1>
                <div className="dboardbtns">
                    <div><Button onClick={profileClick} variant="outlined" size="medium">Profile</Button></div>
                    <div><Button onClick={logoutClick} variant="outlined" size="medium" color="error">Logout</Button></div>
                </div>
                
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
                <Todo 
                    id={1} 
                    title={"Test todo 1 "} 
                    des={"fdjgsj"} 
                    deadline={"2026-07-14T09:27:35Z"}
                    priority={5}
                    is_completed={false}
                    />
                <Todo id={2} 
                    title={"Test todo 2 "} 
                    des={"fdjgsj"} 
                    deadline={"2025-07-14T09:27:35Z"}
                    priority={5}
                    is_completed={false}/>
            </div>
            <div>
                <CreateTodoModal updateTodos={getTodos}/>
            </div>
        </div>
    </>
}