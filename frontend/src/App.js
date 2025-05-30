import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import SearchBar from "./Components/SearchBar";

//forms
import UserForm from "./Components/userForm";
import UserList from "./Components/userList";
import EventList from "./Components/eventList";
import EventForm from "./Components/eventForm";
import ParceiroList from "./Components/parceiroList";
import ParceiroForm from "./Components/parceiroForm";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("token") !== null
    );

    const location = useLocation();

    const updateAuthStatus = (status) => {
        setIsAuthenticated(status);
    }


    useEffect(() => {
        const tokenExists = sessionStorage.getItem("token") !== "null";
        if (!tokenExists && location.pathname !== "/login") {
            alert("Logue primeiramente");
        }
    }, [location]);

    const isAdmin = () => {
        return sessionStorage.getItem("role") === "admin";
    };

    const isColaborador = () => {
        return sessionStorage.getItem("role") === "colaborador";
    };


    return (
        <div className="App-container">
            <div className="Content">
                <Routes>
                    {/*não autenticados*/}
                    <Route path="/searchbar" element={SearchBar} />
                    <Route path="/" element={<Login updateAuthStatus={updateAuthStatus} />} />
                    <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />

                    {/*autenticados*/}
                    <Route path="/home" element={isAuthenticated ?
                        <Home updateAuthStatus={updateAuthStatus} /> : <Navigate to="/login" />} />
                    <Route path="*" element={<Navigate to="/" />} />

                    <Route path="/usuarios" element={isAuthenticated && isAdmin() ?
                        <UserList /> : <Navigate to="/login" />} />

                    <Route path="/usuarios/editar/:id" element={isAuthenticated && isAdmin() ?
                        <UserForm /> : <Navigate to="/login" />} />

                    <Route path="/usuarios/cadastro" element={isAuthenticated && isAdmin() ?
                        <UserForm /> : <Navigate to="/login" />} />


                    <Route path="/eventos" element={isAuthenticated && (isColaborador() || isAdmin()) ?
                        <EventList /> : <Navigate to="/login" />} />

                    <Route path="/eventos/evEdit/:id" element={isAuthenticated && (isColaborador() || isAdmin()) ?
                        <EventForm /> : <Navigate to="/login" />} />

                    <Route path="/eventos/evCadastro" element={isAuthenticated && (isColaborador() || isAdmin()) ?
                        <EventForm /> : <Navigate to="/login" />} />



                    <Route path="/parceiros" element={isAuthenticated && (isColaborador() || isAdmin()) ?
                        <ParceiroList /> : <Navigate to="/login" />} />

                    <Route path="/parceiros/parcEdit/:parcId" element={isAuthenticated && (isColaborador() || isAdmin()) ?
                        <ParceiroForm /> : <Navigate to="/login" />} />


                    <Route path="/parceiros/parcCadastro" element={isAuthenticated && (isColaborador() || isAdmin()) ?

                        <ParceiroForm /> : <Navigate to="/login" />} />
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