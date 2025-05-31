import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaFileAlt, FaDownload, FaEye } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/Certificados.css';

function ListarCertificados() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Exemplo de certificados (substitua por dados reais da API)
    const [certificados] = useState([
        {
            id: 1,
            nome: 'Certificado de Reciclagem - Nível Básico',
            dataEmissao: '2024-03-15',
            status: 'Válido',
            pontos: 50
        },
        {
            id: 2,
            nome: 'Certificado de Sustentabilidade',
            dataEmissao: '2024-02-20',
            status: 'Válido',
            pontos: 100
        },
        {
            id: 3,
            nome: 'Certificado de Participação - Workshop Ambiental',
            dataEmissao: '2024-01-10',
            status: 'Válido',
            pontos: 75
        }
    ]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    const handleDownload = (id) => {
        // Implementar lógica de download
        console.log('Download certificado:', id);
    };

    const handleView = (id) => {
        // Implementar lógica de visualização
        console.log('Visualizar certificado:', id);
    };

    if (loading) {
        return (
            <div className="loading">
                <FaFileAlt className="loading-icon" />
                Carregando...
            </div>
        );
    }

    return (
        <div className="certificados-container">
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
                    <Link to="/atendimento">Fale conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="certificados-content">
                <div className="certificados-header">
                    <h1>Meus Certificados</h1>
                    <p>Visualize e faça download dos seus certificados</p>
                </div>

                <div className="certificados-list">
                    {certificados.map((certificado) => (
                        <div key={certificado.id} className="certificado-card">
                            <div className="certificado-icon">
                                <FaFileAlt />
                            </div>
                            <div className="certificado-info">
                                <h3>{certificado.nome}</h3>
                                <p>Data de Emissão: {new Date(certificado.dataEmissao).toLocaleDateString()}</p>
                                <p>Status: <span className="status-valid">{certificado.status}</span></p>
                                <p>Pontos: {certificado.pontos}</p>
                            </div>
                            <div className="certificado-actions">
                                <button onClick={() => handleView(certificado.id)} className="view-btn">
                                    <FaEye /> Visualizar
                                </button>
                                <button onClick={() => handleDownload(certificado.id)} className="download-btn">
                                    <FaDownload /> Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListarCertificados; 