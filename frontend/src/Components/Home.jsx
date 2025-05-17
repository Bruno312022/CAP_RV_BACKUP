//importação de módulos
import React from "react";
import { useNavigate, Link } from "react-router-dom";


//frontend
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="nav">
        <div className="logo-sidebar" >
        <Link to="/Sidebar" className="Sidebar">Sidebar</Link>
        <h4 className="bem-vindo">Logo</h4>
        </div>

        <nav className="navigation">
          <a onClick={() => navigate("/Atendimento")}>fale consco</a>
          <a onClick={() => navigate("/Sobre")}>Sobre</a>
          <a onClick={() => navigate("/")}>Sair</a>
        </nav>
      </nav>
    </>
  );
}

export default Home;
