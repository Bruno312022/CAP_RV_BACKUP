import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus, FaLeaf } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/ColaboradorList.css';

function ColaboradorList() {
    const [colaboradores, setColaboradores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    useEffect(() => {
        fetchColaboradores();
    }, []);

    const fetchColaboradores = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/usuarios', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setColaboradores(response.data.filter(user => user.role === 'colaborador'));
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar colaboradores:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Tem certeza que deseja excluir este colaborador?')) {
            try {
                const token = sessionStorage.getItem('token');
                await axios.delete(`http://localhost:3001/usuarios/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Colaborador excluído com sucesso!');
                fetchColaboradores();
            } catch (error) {
                console.error('Erro ao excluir colaborador:', error);
                alert('Erro ao excluir colaborador');
            }
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="colaborador-list">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
                    <Link to="/" className="logo">
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
            <div className="colaborador-content">
                <div className="colaborador-header">
                    <h1>Gerenciar Colaboradores</h1>
                    <Link to="/colaboradores/novo" className="add-button">
                        <FaUserPlus /> Novo Colaborador
                    </Link>
                </div>

                <div className="colaborador-grid">
                    {colaboradores.map(colaborador => (
                        <div key={colaborador.id} className="colaborador-card">
                            <div className="colaborador-info">
                                <h3>{colaborador.username}</h3>
                                <p>Status: Ativo</p>
                                <p>Eventos Gerenciados: {colaborador.eventosGerenciados || 0}</p>
                            </div>
                            <div className="colaborador-actions">
                                <Link to={`/colaboradores/editar/${colaborador.id}`} className="edit-button">
                                    <FaEdit /> Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(colaborador.id)}
                                    className="delete-button"
                                >
                                    <FaTrash /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {colaboradores.length === 0 && (
                    <div className="no-data">
                        <p>Nenhum colaborador cadastrado</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ColaboradorList; 