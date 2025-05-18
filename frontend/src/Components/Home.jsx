//importação de módulos
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "./Sidebar";


//frontend
function Home() {
  const navigate = useNavigate();

 

  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    alert("Lougout realizada com sucesso.");
    navigate('/');
  }

  return (
    <>
      <nav className="nav">
        <div className="logo-sidebar" >
        <Sidebar />
        <h4 className="bem-vindo">Logo</h4>
        </div>

        <nav className="navigation">
          <Link to="/Atendimento">Fale conosco</Link>
          <Link to="/Sobre">Sobre</Link>
          <button onClick={handleLogout}>Sair</button>
        </nav>
      </nav>
    </>
  );
}

export default Home;
