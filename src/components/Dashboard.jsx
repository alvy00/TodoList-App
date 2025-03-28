import "./components.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "./Todo"
import { CreateTodoModal } from "./CreateTodoModal"
import { Button, TextField } from "@mui/material"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


export function Dashboard(){
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const [todoList, setTodoList] = useState([]);
    //const [filteredList, setFilteredList] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("None");




    const totalTasks = (!todoList.length ? 0 : todoList.length);
    const completedTasks = (!todoList.length ? 0 : todoList.filter(todo => todo.is_completed).length);
    const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const pieData = [
        { name: "Completed", value: completedTasks },
        { name: "Incomplete", value: totalTasks - completedTasks }
    ];
    const COLORS = ["#4caf50", "#f44336"];

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
                <h1> Hellooo {userName}! </h1>
                <div className="dboardbtns">
                    <div><Button onClick={profileClick} variant="outlined" size="medium">Profile</Button></div>
                    <div><Button onClick={logoutClick} variant="outlined" size="medium" color="error">Logout</Button></div>
                </div>
                
            </div>
            <div className="searchBar">
                            <TextField
                    select
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    SelectProps={{ native: true }}
                    variant="outlined"
                >
                    <option value="None">None</option>
                    <option value="CreationNew">Creation Time (Newest First)</option>
                    <option value="CreationOld">Creation Time (Oldest First)</option>
                    <option value="Deadline">Deadline (Soonest First)</option>
                    <option value="Priority">Priority (Highest First)</option>
                </TextField>
                <TextField placeholder="Search" fullWidth value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>

            <div
                className="pieChart"
                style={{
                    filter: totalTasks === 0 ? "grayscale(100%)" : "none",
                    opacity: totalTasks === 0 ? 0.5 : 1,
                    pointerEvents: totalTasks === 0 ? "none" : "auto",
                    textAlign: "center",
                }}
            >
                <h2>📊 Task Statistics</h2>
                {totalTasks === 0 ? (
                    <p style={{ fontStyle: "italic", color: "gray" }}>No tasks to display.</p>
                ) : (
                    <>
                        <p>Total Tasks: <strong>{totalTasks}</strong></p>
                        <p>Completed Tasks: <strong>{completedTasks}</strong></p>
                        <p>Efficiency: <strong>{efficiency}%</strong></p>

                        <PieChart width={430} height={250}>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </>
                )}
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