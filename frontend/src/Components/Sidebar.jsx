

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Sidebar.css";



function Sidebar() {
  useEffect(() => {
    const toggle = document.querySelector(".toggle");
    const sidebar = document.querySelector(".sidebar");
    const dropdowns = document.querySelectorAll(".dropdown-btn");

    toggle.onclick = () => {
      sidebar.classList.toggle("active");
    };

    dropdowns.forEach((btn) => {
      btn.onclick = () => {
        btn.classList.toggle("open");
        const dropdownContent = btn.nextElementSibling;
        dropdownContent.classList.toggle("show");
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
        <a href="/">Sobre nos</a>

        <button className="dropdown-btn">Eventos ▾</button>
        <div className="dropdown-container">
          <a href="/">palestras</a>
          <a href="/">oficinas</a>
          <a href="/">campanhas</a>
        </div>

        <button className="dropdown-btn">ativiades ▾</button>
        <div className="dropdown-container">
          <a href="/">reciclagem pet</a>
          <a href="/">reciclagem metais </a>
          <a href="/">reciclagem diversos </a>
        </div>

         <button className="dropdown-btn">certificados▾</button>
        <div className="dropdown-container">
          <a href="/">listar certificados </a>
          <a href="/">validar certificados </a>
        </div>

        <a href="/charts" className="ajuda-btn">ajuda</a>
      </div>
    </>
  );
}

export default Sidebar;
