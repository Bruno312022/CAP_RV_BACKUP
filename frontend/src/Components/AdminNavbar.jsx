import React from 'react';
import { FaLeaf } from 'react-icons/fa';
import '../CSS/AdminNavbar.css';

function AdminNavbar({ toggleSidebar }) {
    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-content">
                <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
                <div className="admin-logo">
                    <FaLeaf className="leaf-icon mirror" />
                    <h1>RECOMPENSA</h1>
                    <FaLeaf className="leaf-icon" />
                    <h1>VERDE</h1>
                </div>
                <div className="admin-title">
                    <h2>Intranet</h2>
                </div>
            </div>
        </nav>
    );
}

export default AdminNavbar; 