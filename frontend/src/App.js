import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import SearchBar from "./Components/SearchBar";
import UserForm from "./Components/userForm";
import UserList from "./Components/userList";
import EventList from "./Components/eventList";
import EventForm from "./Components/eventForm";
import ColaboradorList from "./Components/ColaboradorList";
import ColaboradorForm from "./Components/ColaboradorForm";
import MeusPontos from "./Components/MeusPontos";
import ListarCertificados from "./Components/ListarCertificados";
import ValidarCertificados from "./Components/ValidarCertificados";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("token") !== null
    );

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(token !== null);
    }, []);

    const updateAuthStatus = (status) => {
        setIsAuthenticated(status);
    };

    const isAdmin = () => {
        return sessionStorage.getItem("role") === "admin";
    };

    const isColaborador = () => {
        return sessionStorage.getItem("role") === "colaborador";
    };

    const isAdminOrColaborador = () => {
        const role = sessionStorage.getItem("role");
        return role === "admin" || role === "colaborador";
    };

    // Função para verificar autenticação
    const PrivateRoute = ({ children, allowedRoles = [] }) => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");

        if (!token) {
            sessionStorage.clear();
            return <Navigate to="/" />;
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
            return <Navigate to="/home" />;
        }

        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login updateAuthStatus={updateAuthStatus} />} />
                <Route path="/login" element={<Login updateAuthStatus={updateAuthStatus} />} />
                
                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                {/* Rotas de Administração */}
                <Route path="/dashboard" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <Dashboard />
                    </PrivateRoute>
                } />

                <Route path="/usuarios" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <UserList />
                    </PrivateRoute>
                } />

                <Route path="/usuarios/novo" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <UserForm />
                    </PrivateRoute>
                } />

                <Route path="/usuarios/editar/:id" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <UserForm />
                    </PrivateRoute>
                } />

                <Route path="/colaboradores" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <ColaboradorList />
                    </PrivateRoute>
                } />

                <Route path="/colaboradores/novo" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <ColaboradorForm />
                    </PrivateRoute>
                } />

                <Route path="/colaboradores/editar/:id" element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <ColaboradorForm />
                    </PrivateRoute>
                } />

                {/* Rotas de Eventos */}
                <Route path="/eventos" element={
                    <PrivateRoute allowedRoles={['admin', 'colaborador']}>
                        <EventList />
                    </PrivateRoute>
                } />

                <Route path="/eventos/novo" element={
                    <PrivateRoute allowedRoles={['admin', 'colaborador']}>
                        <EventForm />
                    </PrivateRoute>
                } />

                <Route path="/eventos/editar/:id" element={
                    <PrivateRoute allowedRoles={['admin', 'colaborador']}>
                        <EventForm />
                    </PrivateRoute>
                } />

                {/* Rotas de Pontos */}
                <Route path="/meuspontos" element={
                    <PrivateRoute>
                        <MeusPontos />
                    </PrivateRoute>
                } />

                <Route path="/historicopontos" element={
                    <PrivateRoute>
                        <div>Histórico de Pontos</div>
                    </PrivateRoute>
                } />

                <Route path="/resgatepontos" element={
                    <PrivateRoute>
                        <div>Resgate de Pontos</div>
                    </PrivateRoute>
                } />

                {/* Rotas de Certificados */}
                <Route path="/listCertificados" element={
                    <PrivateRoute>
                        <ListarCertificados />
                    </PrivateRoute>
                } />

                <Route path="/validarCertificados" element={
                    <PrivateRoute allowedRoles={['admin', 'colaborador']}>
                        <ValidarCertificados />
                    </PrivateRoute>
                } />

                {/* Rota padrão */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;