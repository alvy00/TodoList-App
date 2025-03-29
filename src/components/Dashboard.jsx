import "./components.css"
import { useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Todo } from "./Todo"
import { CreateTodoModal } from "./CreateTodoModal"
import { Button, TextField } from "@mui/material"
import toast from "react-hot-toast"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export function Dashboard() {
    const navigate = useNavigate()
    const userName = localStorage.getItem("username")
    const [todoList, setTodoList] = useState([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("None")

    const totalTasks = todoList.length
    const completedTasks = todoList.filter(todo => todo.is_completed).length
    const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    const pieData = [
        { name: "Completed", value: completedTasks },
        { name: "Incomplete", value: totalTasks - completedTasks }
    ]
    const COLORS = ["#4caf50", "#f44336"]

    async function getTodos() {
        const response = await fetch("https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/todos")
        const data = await response.json()
        setTodoList(data)
    }

    function logoutClick() {
        localStorage.removeItem("username")
        toast.success("Logged out successfully!")
        navigate("/")
    }

    function profileClick() {
        navigate("/profile")
    }

    useEffect(() => {
        if (!userName) navigate("/login")
        getTodos()
    }, [])

    const getSortedTodos = (todos, sortBy) => {
        const sorted = [...todos]
        switch (sortBy) {
            case "CreationNew":
                return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            case "CreationOld":
                return sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            case "Deadline":
                return sorted.sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            case "Priority":
                return sorted.sort((a, b) => (b.priority || 0) - (a.priority || 0))
            default:
                return todos
        }
    }

    const filteredAndSortedTodos = useMemo(() => {
        const filtered = todoList.filter(todo =>
            todo.title.toLowerCase().includes(search.toLowerCase())
        )
        return getSortedTodos(filtered, sortBy)
    }, [todoList, sortBy, search])

    return (
        <div className="dashboard">
            <div className="navBar">
                <h1>Hello {userName}!</h1>
                <div className="dboardbtns">
                    <div>
                        <Button onClick={profileClick} variant="outlined" size="medium">Profile</Button>
                    </div>
                    <div>
                        <Button onClick={logoutClick} variant="outlined" size="medium" color="error">Logout</Button>
                    </div>
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

                <TextField
                    placeholder="Search"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <br />

            <div
                className="pieChart"
                style={{
                    filter: totalTasks === 0 ? "grayscale(100%)" : "none",
                    opacity: totalTasks === 0 ? 0.5 : 1,
                    pointerEvents: totalTasks === 0 ? "none" : "auto",
                    textAlign: "center",
                }}
            >
                <h2>📊 Task Statistics</h2><br/>
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

            <br />

            <div className="todoList">
                <div>
                    {filteredAndSortedTodos.map((value, index) => (
                        <Todo
                            key={index}
                            id={value.id}
                            title={value.title}
                            des={value.description}
                            deadline={value.deadline}
                            priority={value.priority}
                            is_completed={value.is_completed}
                            user_id={value.user_id}
                            updateTodos={getTodos}
                        />
                    ))}

                    <Todo 
                        id={1} 
                        title={"Test todo 1 "} 
                        des={"fdjgsj"} 
                        deadline={"2026-07-14T09:27:35Z"}
                        priority={5}
                        is_completed={false}
                    />
                </div>
            </div>

            <br />

            <div>
                <CreateTodoModal updateTodos={getTodos} />
            </div>
        </div>
    )
}
