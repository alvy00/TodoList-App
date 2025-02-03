import { useState } from "react";


function Form(){
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleNameChange(e){
    setName(e.target.value)
  }
  function handlePhoneChange(e){
    setPhone(e.target.value)
  }
  return <>
    <div>
      Name: <input type="text" placeholder="Put ur name here" onChange={handleNameChange} value={name} required/><br/><br/>
      Phone: <input type="text" placeholder="Put ur number here" onChange={handlePhoneChange} value={phone} required/>
    </div>
    <div>
      Your name is {name} and your phone is {phone}
    </div>
    
  </>
}
function App() {

  return (
    <>
      <Form/>
    </>
  )
}

export default App
