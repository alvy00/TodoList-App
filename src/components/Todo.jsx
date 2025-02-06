import toast from "react-hot-toast";

export function Todo({id, title, des, deadline, priority, is_completed, created, user_id, updateTodos }){
    async function deleteClick(){
        const response = await fetch("http://3.109.211.104:8001/todo/" + id, {
            method: "DELETE"
        });
        const data = await response.json();
        toast.success(data.message);
        updateTodos();
    }
    
    return <>
        <div className="todo" style={{backgroundColor: priority>5 ? "red":"brgb(220, 217, 217)"}}>
            <div style={{fontSize: "30px", textDecoration: is_completed ? "line-through" : ""}}>
                {is_completed? "✅":"⏳"}
                {id}
                {title}
                {des}
                {deadline}
                {created}
                {user_id}
            </div>
            <div className='buttons'>
                <div>✅</div>
                <div onClick={deleteClick}>🔥</div>
            </div>
        </div>
    </>
}
