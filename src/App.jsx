import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css"
import {Home} from "./components/Home"
import {Login} from "./components/Login";
import {Create} from "./components/Create";
import { Dashboard } from "./components/Dashboard";
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/> 
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Create />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>

        <Toaster />
    </>
  )
}

export default App
