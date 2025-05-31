import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import UserList from './Components/userList';
import UserForm from './Components/userForm';
import ColaboradorList from './Components/ColaboradorList';
import Sobre from './Components/Sobre';
import Atendimento from './Components/Atendimento';
import EventList from './Components/eventList';
import EventForm from './Components/eventForm';
import MeusPontos from './Components/MeusPontos';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("token") !== null
    );

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsAuthenticated(token !== null);
    }, []);

    // Função para verificar autenticação e permissões
    const PrivateRoute = ({ children }) => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");
        const currentPath = window.location.pathname;
        
        if (!token) {
            console.log('Usuário não autenticado. Salvando URL:', currentPath);
            sessionStorage.setItem('redirectUrl', currentPath);
            return <Navigate to="/" replace />;
        }

        // Verifica se é uma rota administrativa
        if (currentPath.startsWith('/usuarios') && role !== 'admin') {
            console.log('Acesso negado: rota administrativa');
            return <Navigate to="/home" replace />;
        }

        console.log('Usuário autenticado. Acessando:', currentPath);
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/usuarios" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/usuarios/novo" element={<PrivateRoute><UserForm /></PrivateRoute>} />
                <Route path="/usuarios/editar/:id" element={<PrivateRoute><UserForm /></PrivateRoute>} />
                <Route path="/colaboradores" element={<PrivateRoute><ColaboradorList /></PrivateRoute>} />
                <Route path="/sobre" element={<PrivateRoute><Sobre /></PrivateRoute>} />
                <Route path="/atendimento" element={<PrivateRoute><Atendimento /></PrivateRoute>} />
                <Route path="/eventos" element={<PrivateRoute><EventList /></PrivateRoute>} />
                <Route path="/eventos/novo" element={<PrivateRoute><EventForm /></PrivateRoute>} />
                <Route path="/eventos/editar/:id" element={<PrivateRoute><EventForm /></PrivateRoute>} />
                <Route path="/meuspontos" element={<PrivateRoute><MeusPontos /></PrivateRoute>} />
                <Route path="/historicopontos" element={<PrivateRoute><div>Histórico de Pontos</div></PrivateRoute>} />
                <Route path="/resgatepontos" element={<PrivateRoute><div>Resgate de Pontos</div></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App; 