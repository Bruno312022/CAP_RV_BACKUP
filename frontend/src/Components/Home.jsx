import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar /> {/* Aqui a Sidebar aparece já na Home */}

      <nav className="nav">
        <div className="logo-sidebar">
          <h4 className="bem-vindo">Logo</h4>
        </div>

        <nav className="navigation">
          <a onClick={() => navigate("/Atendimento")}>Fale Conosco</a>
          <a onClick={() => navigate("/Sobre")}>Sobre</a>
          <a onClick={() => navigate("/")}>Sair</a>
        </nav>
      </nav>
    </>
  );
}

export default Home;
