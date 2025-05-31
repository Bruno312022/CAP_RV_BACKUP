import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendarAlt, FaHandshake, FaMedal, FaLeaf } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Sidebar from './Sidebar';
import '../CSS/Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalPartners: 0,
        totalPoints: 0
    });

    const [eventData, setEventData] = useState({
        labels: [],
        datasets: []
    });

    const [userData, setUserData] = useState({
        labels: [],
        datasets: []
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            // Buscar dados dos usuários
            const usersResponse = await axios.get('http://localhost:3001/usuarios', { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];

            // Buscar dados dos eventos
            const eventsResponse = await axios.get('http://localhost:3001/eventos', { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            const events = Array.isArray(eventsResponse.data) ? eventsResponse.data : [];

            // Buscar dados dos parceiros
            const partnersResponse = await axios.get('http://localhost:3001/parceiros', { 
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            const partners = Array.isArray(partnersResponse.data) ? partnersResponse.data : [];

            // Calcular estatísticas
            const totalPoints = events.reduce((acc, event) => acc + (Number(event.pontos) || 0), 0);

            setStats({
                totalUsers: users.length,
                totalEvents: events.length,
                totalPartners: partners.length,
                totalPoints: totalPoints
            });

            // Preparar dados para o gráfico de eventos por mês
            const eventsByMonth = {};
            events.forEach(event => {
                const date = new Date(event.data || event.createdAt);
                const month = date.toLocaleString('pt-BR', { month: 'long' });
                eventsByMonth[month] = (eventsByMonth[month] || 0) + 1;
            });

            setEventData({
                labels: Object.keys(eventsByMonth),
                datasets: [{
                    label: 'Eventos por Mês',
                    data: Object.values(eventsByMonth),
                    borderColor: '#537D5D',
                    backgroundColor: 'rgba(83, 125, 93, 0.2)',
                    tension: 0.4
                }]
            });

            // Preparar dados para o gráfico de distribuição de usuários
            const usersByRole = {
                admin: users.filter(user => user.role === 'admin').length,
                colaborador: users.filter(user => user.role === 'colaborador').length,
                user: users.filter(user => user.role === 'user').length
            };

            setUserData({
                labels: ['Administradores', 'Colaboradores', 'Usuários'],
                datasets: [{
                    label: 'Distribuição de Usuários',
                    data: Object.values(usersByRole),
                    backgroundColor: [
                        'rgba(83, 125, 93, 0.8)',
                        'rgba(61, 92, 68, 0.8)',
                        'rgba(108, 163, 121, 0.8)'
                    ]
                }]
            });

            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            if (error.response?.status === 401) {
                sessionStorage.clear();
                alert('Sessão expirada. Por favor, faça login novamente.');
                navigate('/');
            } else {
                alert('Erro ao carregar dados do dashboard. Por favor, tente novamente.');
            }
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="dashboard">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
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

            <div className="dashboard-content">
                <h1>Dashboard</h1>
                
                <div className="stats-grid">
                    <div className="stat-card">
                        <FaUsers className="stat-icon" />
                        <div className="stat-info">
                            <h3>Usuários</h3>
                            <p>{stats.totalUsers}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <FaCalendarAlt className="stat-icon" />
                        <div className="stat-info">
                            <h3>Eventos</h3>
                            <p>{stats.totalEvents}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <FaHandshake className="stat-icon" />
                        <div className="stat-info">
                            <h3>Parceiros</h3>
                            <p>{stats.totalPartners}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <FaMedal className="stat-icon" />
                        <div className="stat-info">
                            <h3>Pontos Totais</h3>
                            <p>{stats.totalPoints}</p>
                        </div>
                    </div>
                </div>

                <div className="charts-grid">
                    <div className="chart-card">
                        <h3>Eventos por Mês</h3>
                        <Line data={eventData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: false
                                }
                            }
                        }} />
                    </div>

                    <div className="chart-card">
                        <h3>Distribuição de Usuários</h3>
                        <Bar data={userData} options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: false
                                }
                            }
                        }} />
                    </div>
                </div>

                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h3>Usuários</h3>
                        <p>Gerenciar usuários do sistema</p>
                        <Link to="/usuarios" className="dashboard-link">Acessar</Link>
                    </div>
                    <div className="dashboard-card">
                        <h3>Colaboradores</h3>
                        <p>Gerenciar colaboradores</p>
                        <Link to="/colaboradores" className="dashboard-link">Acessar</Link>
                    </div>
                    <div className="dashboard-card">
                        <h3>Eventos</h3>
                        <p>Gerenciar eventos e atividades</p>
                        <Link to="/eventos" className="dashboard-link">Acessar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 