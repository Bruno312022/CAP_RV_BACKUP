import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaFileUpload, FaTimesCircle } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/Certificados.css';

function ValidarCertificados() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type === "application/pdf") {
            setFile(file);
        } else {
            alert("Por favor, envie apenas arquivos PDF");
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const handleSubmit = async () => {
        if (!file) {
            alert("Por favor, selecione um arquivo primeiro");
            return;
        }

        setLoading(true);
        try {
            // Aqui você implementaria a lógica de upload do arquivo
            // const formData = new FormData();
            // formData.append('certificado', file);
            // await axios.post('/api/certificados/validar', formData);
            
            alert("Certificado enviado com sucesso!");
            setFile(null);
        } catch (error) {
            alert("Erro ao enviar certificado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

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
                    <h1>Validar Certificado</h1>
                    <p>Faça upload do seu certificado para validação</p>
                </div>

                <div className="upload-container">
                    <div 
                        className={`drop-zone ${dragActive ? 'drag-active' : ''}`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="file-input"
                            accept=".pdf"
                            onChange={handleFileInput}
                            className="file-input"
                        />
                        
                        {!file ? (
                            <div className="upload-prompt">
                                <FaFileUpload className="upload-icon" />
                                <p>Arraste seu certificado aqui ou clique para selecionar</p>
                                <span className="file-info">Apenas arquivos PDF são aceitos</span>
                            </div>
                        ) : (
                            <div className="file-preview">
                                <p>{file.name}</p>
                                <button onClick={removeFile} className="remove-file">
                                    <FaTimesCircle /> Remover
                                </button>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={handleSubmit} 
                        className="submit-btn"
                        disabled={!file || loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar para Validação'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ValidarCertificados; 