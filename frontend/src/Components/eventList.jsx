import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaLeaf } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/Event.css';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Carrega lista de eventos ao montar o componente
    useEffect(() => {
        loadEvents();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    // Função para carregar eventos
    const loadEvents = () => {
        const token = sessionStorage.getItem("token");
        axios.get("http://localhost:3001/eventos", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setEvents(response.data);
            setLoading(false);
        })
        .catch(error => {
            console.error("Erro ao carregar eventos:", error);
            alert("Erro ao carregar eventos!");
            setLoading(false);
        });
    };

    // Função de deletar
    const handleDelete = async (eventId) => {
        if (window.confirm('Tem certeza que deseja excluir este evento?')) {
            const token = sessionStorage.getItem("token");
            try {
                await axios.delete(`http://localhost:3001/eventos/${eventId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                loadEvents();
            } catch (error) {
                console.error("Erro ao excluir evento:", error);
                alert("Erro ao excluir evento!");
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    // Interface
    return (
        <div className="event-container">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
                    <div className="logo">
                        <h1>RECOMPENSA</h1>
                        <h1>VERDE</h1>
                        <FaLeaf className="leaf-icon" />
                    </div>
                </div>
                <div className="navigation">
                    <Link to="/atendimento">Fale conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="event-header">
                <h1>Gerenciar Eventos</h1>
                <button onClick={() => navigate('/eventos/novo')} className="add-event-btn">
                    <FaPlus /> Novo Evento
                </button>
            </div>

            {loading ? (
                <p>Carregando eventos...</p>
            ) : (
                <div className="event-list">
                    {events.map(event => (
                        <div key={event.eventoId} className="event-card">
                            <img 
                                src={event.imagem} 
                                alt={event.eventoName} 
                                className="event-image"
                                onError={(e) => {
                                    e.target.src = '/placeholder.jpg';
                                }}
                            />
                            <div className="event-info">
                                <span className={`event-status status-${event.status}`}>
                                    {event.status === 'active' ? 'Ativo' : 'Inativo'}
                                </span>
                                <h3>{event.eventoName}</h3>
                                <p>{event.descricao}</p>
                                <p><strong>Categoria:</strong> {event.categoria}</p>
                                <p><strong>Local:</strong> {event.eventoEndereco}</p>
                                <p><strong>Data:</strong> {formatDate(event.eventoData)} às {event.eventoHora}</p>
                                {event.link && (
                                    <p>
                                        <strong>Link:</strong> <a href={event.link} target="_blank" rel="noopener noreferrer">Acessar</a>
                                    </p>
                                )}
                            </div>
                            <div className="event-actions">
                                <button 
                                    onClick={() => navigate(`/eventos/editar/${event.eventoId}`)}
                                    className="btn-edit"
                                >
                                    <FaEdit /> Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(event.eventoId)}
                                    className="btn-delete"
                                >
                                    <FaTrash /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EventList;
