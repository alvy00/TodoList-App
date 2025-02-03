import { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./App.css"
import {Login} from "./components/Login";
import {Create} from "./components/Create";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Create />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
