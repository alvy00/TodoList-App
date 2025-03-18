/* eslint-disable no-unused-vars */
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css"
import { Home } from "./Home"
import { Login } from "./components/Login";
import { Create } from "./components/Create";
import { Dashboard } from "./components/Dashboard";
import Profile from './components/Profile';
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
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>

        <Toaster />
    </>
  )
}

export default App
