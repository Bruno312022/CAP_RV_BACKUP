import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/Atendimento.css';

function Atendimento() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
    }, [navigate]);

    const toggleSidebar = () => {
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active');
    };

    return (
        <div className="page-container">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
                    <Link to="/home" className="logo">
                        <h1>RECOMPENSA</h1>
                        <h1>VERDE</h1>
                        <FaLeaf className="leaf-icon" />
                    </Link>
                </div>

                <div className="navigation">
                    <Link to="/home">Início</Link>
                    <Link to="/atendimento" className="active">Fale Conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="atendimento-container">
                <div className="atendimento-header">
                    <h1>Fale Conosco</h1>
                    <p>Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo.</p>
                </div>

                <div className="atendimento-content">
                    <div className="contact-info">
                        <div className="contact-card">
                            <FaEnvelope className="contact-icon" />
                            <h3>E-mail</h3>
                            <p>recompensaV@gmail.com</p>
                            <p className="detail-text">Respondemos em até 24 horas úteis</p>
                        </div>

                        <div className="contact-card">
                            <FaPhone className="contact-icon" />
                            <h3>Telefone</h3>
                            <p>(92) 98888-7777</p>
                            <p className="detail-text">Segunda a Sexta, 8h às 18h</p>
                        </div>

                        <div className="contact-card">
                            <FaClock className="contact-icon" />
                            <h3>Horário de Atendimento</h3>
                            <p>Segunda a Sexta</p>
                            <p>8:00 - 18:00</p>
                            <p className="detail-text">Exceto feriados</p>
                        </div>

                        <div className="contact-card">
                            <FaMapMarkerAlt className="contact-icon" />
                            <h3>Endereço</h3>
                            <p>Av. Djalma Batista, 3000</p>
                            <p>Manaus - AM</p>
                            <p className="detail-text">CEP: 69050-010</p>
                        </div>
                    </div>

                    <div className="contact-message">
                        <h2>Sobre o Recompensa Verde</h2>
                        <p>
                            O Recompensa Verde é um programa inovador que visa promover a sustentabilidade 
                            e a consciência ambiental através de um sistema de recompensas. Valorizamos 
                            cada ação em prol do meio ambiente e estamos comprometidos em construir um 
                            futuro mais sustentável.
                        </p>
                        <p>
                            Nossa equipe está sempre disponível para:
                        </p>
                        <ul>
                            <li>Esclarecer dúvidas sobre o programa</li>
                            <li>Auxiliar no cadastro e participação em eventos</li>
                            <li>Fornecer informações sobre pontos e recompensas</li>
                            <li>Receber sugestões e feedback</li>
                            <li>Resolver problemas técnicos</li>
                        </ul>
                        <p>
                            Sua opinião é muito importante para nós. Não hesite em entrar em contato 
                            por qualquer um dos nossos canais de atendimento.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Atendimento; 