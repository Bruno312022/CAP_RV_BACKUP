//importação de módulos
import React from "react";
import { useNavigate, Link } from "react-router-dom";


//frontend
function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header>
          <Link to="/Sidebar" className="Sidebar"><RiMenuFill /></Link>
          <h4 className="bem-vindo">Bem-vindo, Nome+do+usuário!</h4>
          <div>
            <input className="search" type="search" placeholder="buscar" />
            <RiSearch2Line />
            </div>

          <nav className="navigation">
            <a onClick={() => navigate("/Atendimento")}>fale consco</a>
            <a onClick={() => navigate("/Sobre")}>Sobre</a>
            <a onClick={() => navigate("/")}>Sair</a>
          </nav>
      </header>
    </>
  );
}

export default Home;
