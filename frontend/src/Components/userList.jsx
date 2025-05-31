import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaUserPlus, FaLeaf } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                navigate('/');
                return;
            }
            
            const response = await axios.get("http://localhost:3001/usuarios", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setUsers(response.data || []);
            setError('');
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar usuários:', error);
            if (error.response?.status === 401) {
                sessionStorage.clear();
                navigate('/');
            } else {
                setError(error.response?.data?.error || 'Erro ao carregar usuários. Por favor, tente novamente.');
            }
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    navigate('/');
                    return;
                }
                
                await axios.delete(`http://localhost:3001/usuarios/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setUsers(users.filter(user => user.id !== userId));
                setError('');
            } catch (error) {
                console.error('Erro ao excluir usuário:', error);
                if (error.response?.status === 401) {
                    sessionStorage.clear();
                    navigate('/');
                } else {
                    setError(error.response?.data?.error || 'Erro ao excluir usuário. Por favor, tente novamente.');
                }
            }
        }
    };

    const handleCreateUser = () => {
        const token = sessionStorage.getItem("token");
        const role = sessionStorage.getItem("role");
        
        if (!token) {
            navigate('/');
            return;
        }

        if (role !== 'admin') {
            setError('Apenas administradores podem criar novos usuários.');
            return;
        }

        navigate('/usuarios/novo');
    };

    const getRoleDisplay = (role) => {
        const roles = {
            'admin': 'Administrador',
            'user': 'Usuário',
            'colaborador': 'Colaborador'
        };
        return roles[role] || role;
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="user-list">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={() => document.querySelector('.sidebar').classList.toggle('active')}>&#9776;</div>
                    <Link to="/dashboard" className="logo">
                        <h1>RECOMPENSA</h1>
                        <h1>VERDE</h1>
                        <FaLeaf className="leaf-icon" />
                    </Link>
                </div>

                <div className="navigation">
                    <Link to="/atendimento">Fale conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="user-content">
                <div className="user-header">
                    <h1>Gerenciar Usuários</h1>
                    <button 
                        onClick={handleCreateUser} 
                        className="add-button"
                        title="Criar novo usuário"
                    >
                        <FaUserPlus /> Novo Usuário
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="user-grid">
                    {users.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <p>Email: {user.email}</p>
                                <p>Tipo: {getRoleDisplay(user.role)}</p>
                                <p>Criado em: {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="user-actions">
                                <button 
                                    onClick={() => navigate(`/usuarios/editar/${user.id}`)} 
                                    className="edit-button"
                                    title="Editar usuário"
                                >
                                    <FaEdit /> Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(user.id)}
                                    className="delete-button"
                                    title="Excluir usuário"
                                >
                                    <FaTrash /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {!error && users.length === 0 && (
                    <div className="no-data">
                        <p>Nenhum usuário cadastrado</p>
                        <button 
                            onClick={handleCreateUser} 
                            className="add-button"
                            title="Criar primeiro usuário"
                        >
                            <FaUserPlus /> Cadastrar Primeiro Usuário
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserList;