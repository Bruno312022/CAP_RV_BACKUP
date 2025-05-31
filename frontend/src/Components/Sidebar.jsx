import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Sidebar.css";

function Sidebar() {
    const role = sessionStorage.getItem("role");
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setOpenDropdown(openDropdown === index ? null : index);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate('/');
    };

    const toggleSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
    };

    return (
        <div className="sidebar active">
            <div className="sidebar-header">
                <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
            </div>
            <ul>
                {role === "admin" && (
                    <li>
                        <button className="dropdown-btn" onClick={() => toggleDropdown(0)}>
                            Administração ▾
                        </button>
                        <div className={`dropdown-container ${openDropdown === 0 ? 'show' : ''}`}>
                            <Link to="/dashboard">Dashboard</Link>
                            <Link to="/usuarios">Usuários</Link>
                            <Link to="/colaboradores">Colaboradores</Link>
                        </div>
                    </li>
                )}

                {(role === "admin" || role === "colaborador") && (
                    <li>
                        <button className="dropdown-btn" onClick={() => toggleDropdown(1)}>
                            Gerenciar Eventos ▾
                        </button>
                        <div className={`dropdown-container ${openDropdown === 1 ? 'show' : ''}`}>
                            <Link to="/eventos">Listar Eventos</Link>
                        </div>
                    </li>
                )}

                <li>
                    <button className="dropdown-btn" onClick={() => toggleDropdown(2)}>
                        Pontos ▾
                    </button>
                    <div className={`dropdown-container ${openDropdown === 2 ? 'show' : ''}`}>
                        <Link to="/meuspontos">Meus Pontos</Link>
                        <Link to="/historicopontos">Histórico</Link>
                    </div>
                </li>

                <li>
                    <button className="dropdown-btn" onClick={() => toggleDropdown(3)}>
                        Certificados ▾
                    </button>
                    <div className={`dropdown-container ${openDropdown === 3 ? 'show' : ''}`}>
                        <Link to="/listCertificados">Listar Certificados</Link>
                        <Link to="/validCertificados">Validar Certificados</Link>
                    </div>
                </li>
            </ul>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    Sair
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
