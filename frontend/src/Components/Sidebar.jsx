import react from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../CSS/Sidebar.css";


function Sidebar() {
    const role = sessionStorage.getItem("role");

    useEffect(() => {
        const toggle = document.querySelector(".toggle");
        const sidebar = document.querySelector(".sidebar");
        const dropdowns = document.querySelectorAll(".dropdown-btn");

        toggle.onclick = () => {
            sidebar.classList.toggle("active");
        };

        if (sidebar.classList.contains("active")) {
            document.body.classList.remove("sidebar-active");
        } else {
            document.body.classList.add("sidebar-active");
        }


        dropdowns.forEach((btn) => {
            btn.onclick = () => {
                btn.classList.toggle("open");
                const dropdownContent = btn.nextElementSibling;
                dropdownContent.style.maxHeight = btn.classList.contains("open")
                    ? dropdownContent.scrollHeight + "px"
                    : "0";
            };
        });

    }, []);




    return (
        <>

            <div className="navbar">
                <div className="toggle">&#9776;</div>
                <img src="" alt="" />
            </div>

            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>

                    {role === "admin" && (
                        <button className="dropdown-btn">Administração ▾</button>
                    )}

                    {/*adm only*/}
                    {role === "admin" && (
                        <div className="dropdown-container">
                            <a href="/usuarios">Usuários</a>
                            <a href="/settings">Configurações</a>
                            <a href="/reports">Relatórios</a>
                        </div>
                    )}


                    <li><button className="dropdown-btn">Eventos ▾</button>
                        <div className="dropdown-container">
                            <a href="/palestras">palestras</a>
                            <a href="/oficinas">oficinas</a>
                            <a href="/campanhas">campanhas</a>
                        </div>
                    </li>

                    <li><button className="dropdown-btn">ativiades ▾</button>
                        <div className="dropdown-container">
                            <a href="/recPet">reciclagem pet</a>
                            <a href="/recMetais">reciclagem metais </a>
                            <a href="/recDiversos">reciclagem diversos </a>
                        </div>
                    </li>


                    <li><button className="dropdown-btn">certificados▾</button>
                        <div className="dropdown-container">
                            <a href="/listCertificados">listar certificados </a>
                            <a href="/validCertificados">validar certificados </a>
                        </div>
                    </li>

                    <li><Link to="/Ajuda" className="ajuda-btn">Ajuda</Link></li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
