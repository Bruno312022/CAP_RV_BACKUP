import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import UserForm from "./Components/userForm";
import UserList from "./Components/userList";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SearchBar from "./Components/SearchBar";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("authenticated") === "true"
    );

     const location = useLocation();

    const updateAuthStatus = (status) => {
        setIsAuthenticated(status);
    }

   
    useEffect(() => {
        const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
        if (!isAuthenticated && location.pathname !== "/login") {
            alert("Usuário não possui permissão.")
        }
    }, [location]);

    const isAdmin = () => {
        return sessionStorage.getItem("role") === "admin";
    };


    return (
        <div className="App-container">
            <div className="Content">
                <Routes>
                    {/*não autenticados*/}
                    <Route path="/searchbar" element={SearchBar}/>
                    <Route path="/" element={<Login updateAuthStatus={updateAuthStatus} />} />
                    <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />

                    {/*autenticados*/}
                    <Route path="/home" element={isAuthenticated ? 
                    <Home updateAuthStatus={updateAuthStatus} /> : <Navigate to="/login" />} />

                    <Route path="/usuarios" element={isAuthenticated && isAdmin() ? 
                    <UserList /> : <Navigate to="/login" />} />

                    <Route path="/usuarios/editar/:id" element={isAuthenticated && isAdmin() ? 
                    <UserForm /> : <Navigate to="/login" />} />

                    <Route path="/usuarios/cadastro" element={isAuthenticated && isAdmin() ? 
                    <UserForm /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </div>
    )
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}