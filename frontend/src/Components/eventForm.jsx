import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaLeaf, FaSave, FaArrowLeft } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/Event.css';

function EventForm() {
    const [event, setEvent] = useState({
        eventoName: '',
        eventoEndereco: '',
        eventoData: '',
        eventoHora: '',
        descricao: '',
        categoria: 'Palestra',
        imagem: '',
        link: '',
        status: 'active'
    });

    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    useEffect(() => {
        if (isEditing) {
            const token = sessionStorage.getItem('token');
            axios.get(`http://localhost:3001/eventos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setEvent(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar evento:', error);
                alert('Erro ao carregar dados do evento');
            });
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        try {
            if (isEditing) {
                await axios.put(`http://localhost:3001/eventos/${id}`, event, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:3001/eventos', event, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/eventos');
        } catch (error) {
            console.error('Erro ao salvar evento:', error);
            alert('Erro ao salvar evento');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                <h1>{isEditing ? 'Editar Evento' : 'Criar Novo Evento'}</h1>
                <button onClick={() => navigate('/eventos')} className="add-event-btn">
                    <FaArrowLeft /> Voltar
                </button>
            </div>

            <form onSubmit={handleSubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="eventoName">Nome do Evento</label>
                    <input
                        type="text"
                        id="eventoName"
                        name="eventoName"
                        value={event.eventoName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={event.descricao}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        name="categoria"
                        value={event.categoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="Palestra">Palestra</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Campanha">Campanha</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="eventoEndereco">Endereço do Evento</label>
                    <input
                        type="text"
                        id="eventoEndereco"
                        name="eventoEndereco"
                        value={event.eventoEndereco}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="eventoData">Data do Evento</label>
                    <input
                        type="date"
                        id="eventoData"
                        name="eventoData"
                        value={event.eventoData}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="eventoHora">Hora do Evento</label>
                    <input
                        type="time"
                        id="eventoHora"
                        name="eventoHora"
                        value={event.eventoHora}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagem">URL da Imagem</label>
                    <input
                        type="url"
                        id="imagem"
                        name="imagem"
                        value={event.imagem}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="link">Link do Evento</label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={event.link}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={event.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="active">Ativo</option>
                        <option value="inactive">Inativo</option>
                    </select>
                </div>

                <button type="submit" className="add-event-btn">
                    <FaSave /> {isEditing ? 'Salvar Alterações' : 'Criar Evento'}
                </button>
            </form>
        </div>
    );
}

export default EventForm;
