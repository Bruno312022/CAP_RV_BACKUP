import React, { useState}from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/Home.css"

const eventos = [
    { id: 1, nome: "Evento de Reciclagem", descricao: "Aprenda a reciclar corretamente", imagem: "https://via.placeholder.com/100", link: "https://open.spotify.com/intl-pt/album/1MgcKezYb874hGsZgYYAdV?si=rguL2mWWQOWmtHl5Aep50g" },
    { id: 2, nome: "Feira de Artesanato", descricao: "Produtos sustentáveis", imagem: "https://via.placeholder.com/100", link: "https://open.spotify.com/intl-pt/album/3lSrcatiOSMpYbT4tGPmZh?si=bNHSxEAdTI609vUxilxeOA" },
    { id: 3, nome: "Palestra sobre Reciclagem", descricao: "Especialistas explicam técnicas de reciclagem", imagem: "https://via.placeholder.com/100", link: "https://www.bing.com/videos/riverview/relatedvideo?q=shadow+the+hedgehog+amv&&mid=E7ED4670244FDBF099A1E7ED4670244FDBF099A1&FORM=VAMGZC" }
];

function Home({ updateAuthStatus }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("authenticated");
        sessionStorage.removeItem("role");
        updateAuthStatus(false);
        alert("Lougout realizada com sucesso.");
        navigate('/login');
    }

     const filteredEventos = searchQuery.trim()
    ? eventos.filter(evento =>
      evento.nome.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : eventos; // 🔹 Se a pesquisa estiver vazia, exibe todos os eventos

    return (
        <>
        <nav className="nav">
            <div className="logo-sidebar">
                <Sidebar />
                <h4 className="bem-vindo">bem vindo</h4>
            </div>


            <nav className="navigation">
                <SearchBar onSearch={setSearchQuery} />
                <Link to="/Atendimento">Fale conosco</Link>
                <Link to="/Sobre">Sobre</Link>
                <button onClick={handleLogout}>Sair</button>
            </nav>
        </nav>

         <div className="eventos-container">
        {filteredEventos.map(evento => (
          <a key={evento.id} href={evento.link} className="evento-card">
            <img src={evento.imagem} alt={evento.nome} className="evento-imagem" />
            <div className="evento-info">
              <h3>{evento.nome}</h3>
              <p>{evento.descricao}</p>
            </div>
          </a>
        ))}
      </div>
      </>
    );
}

export default Home;