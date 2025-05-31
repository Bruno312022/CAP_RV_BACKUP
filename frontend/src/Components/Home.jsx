import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf } from 'react-icons/fa';
import "../CSS/Home.css"

const palestras = [
  { 
    id: 1, 
    nome: "Semana do Meio Ambiente", 
    descricao: "Exposição e palestras sobre sustentabilidade e inclusão", 
    imagem: "/pal1.jpeg", 
    link: "https://portaldoamazonas.com.br/2023/06/02/manaus-abre-semana-do-meio-ambiente-com-exposicao-e-palestras-sobre-sustentabilidade-e-inclusao/",
    categoria: "Palestra"
  },
  { 
    id: 2, 
    nome: "Meio Ambiente e Segurança", 
    descricao: "Parceria entre Semseg e Semmas para fiscalização ambiental", 
    imagem: "/pal2.jpeg", 
    link: "https://amazonasfactual.com.br/2023/09/15/prefeitura-de-manaus-e-delegacia-de-meio-ambiente-realizam-treinamento-para-combate-a-poluicao-sonora/",
    categoria: "Palestra"
  },
  { 
    id: 3, 
    nome: "Lixo Zero", 
    descricao: "Palestra sobre tratamento correto dos resíduos sólidos e os 5Rs", 
    imagem: "/pal3.jpeg", 
    link: "https://emtempo.com.br/57186/sem-categoria/palestra-encerra-programacao-da-semana-do-meio-ambiente-em-manaus/",
    categoria: "Palestra"
  }
];

const oficinas = [
  { 
    id: 1, 
    nome: "Oficinas de Reaproveitamento", 
    descricao: "Cinco oficinas gratuitas de reaproveitamento de resíduos sólidos, incluindo vela, peso de porta, aromatizador e bijuterias", 
    imagem: "/ofc1.jpg", 
    link: "https://www.manaus.am.gov.br/noticia/sustentabilidade/cinco-oficinas-reaproveitamento-residuos/",
    categoria: "Oficina"
  },
  { 
    id: 2, 
    nome: "Arte com Reciclagem", 
    descricao: "Oficina que transforma materiais descartáveis em arte, desenvolvendo objetos decorativos com consciência ambiental", 
    imagem: "/ofc2.jpeg", 
    link: "https://blogdohiellevy.com.br/oficina-arte-com-reciclagem-movimenta-comunidade-do-sao-jorge/",
    categoria: "Oficina"
  },
  { 
    id: 3, 
    nome: "Oficinas de Artesanato", 
    descricao: "Oficinas gratuitas de artesanato com materiais recicláveis, promovendo sustentabilidade e geração de renda", 
    imagem: "/ofc3.jpeg", 
    link: "https://vanguardadonorte.com.br/amazonas/seas-oferece-oficinas-de-artesanato-em-manaus/",
    categoria: "Oficina"
  }
];

const campanhas = [
  { 
    id: 1, 
    nome: "Campanha de Artesanato Sustentável", 
    descricao: "Oficinas de artesanato com materiais recicláveis nos Centros de Convivência, promovendo sustentabilidade", 
    imagem: "/cam1.png", 
    link: "https://vanguardadonorte.com.br/amazonas/seas-oferece-oficinas-de-artesanato-em-manaus/",
    categoria: "Campanha"
  },
  { 
    id: 2, 
    nome: "Reciclagem de Eletrodomésticos", 
    descricao: "Campanha de arrecadação de eletrodomésticos para reciclagem em Manaus, contribuindo com o meio ambiente", 
    imagem: "/cam2.webp", 
    link: "https://segundoasegundo.com.br/2024/05/campanha-arrecada-eletrodomesticos-para-reciclagem-em-manaus/",
    categoria: "Campanha"
  },
  { 
    id: 3, 
    nome: "Descarte Consciente", 
    descricao: "Iniciativa para coleta e reciclagem de equipamentos eletrônicos, evitando o descarte inadequado", 
    imagem: "/cam3.jpeg", 
    link: "https://segundoasegundo.com.br/2024/05/campanha-arrecada-eletrodomesticos-para-reciclagem-em-manaus/",
    categoria: "Campanha"
  }
];

// Função para embaralhar array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Combina todos os eventos e seleciona 3 aleatoriamente
const todosEventos = [...palestras, ...oficinas, ...campanhas];
const eventosVariados = shuffleArray([...todosEventos]).slice(0, 3);

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    // Só faz a requisição se não for o admin direto
    if (token !== 'admin-token') {
      axios.get("http://localhost:3001/usuarios", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setUsuarios(response.data);
        })
        .catch(error => {
          console.error("Erro ao carregar usuários:", error);
          alert("Token inválido ou expirado.");
          window.location.href = "/";
        });
    }
  }, [token, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.querySelector('.sidebar').classList.toggle('active');
    document.body.classList.toggle('sidebar-active', !isSidebarOpen);
  };

  useEffect(() => {
    // Limpar classes quando o componente é desmontado
    return () => {
      document.body.classList.remove('sidebar-active');
    };
  }, []);

  // Funções de filtragem para cada tipo de evento
  const filteredPalestras = searchQuery.trim()
    ? palestras.filter(evento =>
        evento.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evento.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : palestras;

  const filteredOficinas = searchQuery.trim()
    ? oficinas.filter(evento =>
        evento.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evento.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : oficinas;

  const filteredCampanhas = searchQuery.trim()
    ? campanhas.filter(evento =>
        evento.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evento.descricao.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : campanhas;

  // Verifica se há resultados em alguma categoria
  const hasResults = filteredPalestras.length > 0 || 
                    filteredOficinas.length > 0 || 
                    filteredCampanhas.length > 0;

  return (
    <div className="home-container">
      <nav className="nav">
        <div className="logo-sidebar">
          <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
          <div className="logo">
            <h1>RECOMPENSA</h1>
            <h1>VERDE</h1>
            <FaLeaf className="leaf-icon" />
          </div>
        </div>

        <div className="navigation">
          <div className="categoria-filtros">
            <button 
              className={`categoria-btn ${categoriaAtiva === 'todos' ? 'ativo' : ''}`}
              onClick={() => setCategoriaAtiva('todos')}
            >
              Todos
            </button>
            <button 
              className={`categoria-btn ${categoriaAtiva === 'palestras' ? 'ativo' : ''}`}
              onClick={() => setCategoriaAtiva('palestras')}
            >
              Palestras
            </button>
            <button 
              className={`categoria-btn ${categoriaAtiva === 'oficinas' ? 'ativo' : ''}`}
              onClick={() => setCategoriaAtiva('oficinas')}
            >
              Oficinas
            </button>
            <button 
              className={`categoria-btn ${categoriaAtiva === 'campanhas' ? 'ativo' : ''}`}
              onClick={() => setCategoriaAtiva('campanhas')}
            >
              Campanhas
            </button>
          </div>
          <div className="nav-links">
            <SearchBar onSearch={setSearchQuery} />
            <Link to="/atendimento" className="nav-link">Fale Conosco</Link>
            <Link to="/sobre" className="nav-link">Sobre</Link>
          </div>
        </div>
      </nav>

      <Sidebar />

      <section className="featured-section">
        <h2>Destaques</h2>
        <Carousel items={eventosVariados} />
      </section>

      <section className="all-events-section">
        {/* Mensagem quando não há resultados */}
        {searchQuery.trim() && !hasResults && (
          <div className="no-results">
            <p>Nenhum evento encontrado para: "{searchQuery}"</p>
          </div>
        )}

        {/* Só mostra a seção se houver resultados ou não houver busca */}
        {(categoriaAtiva === 'todos' || categoriaAtiva === 'palestras') && (!searchQuery.trim() || filteredPalestras.length > 0) && (
          <>
            <h2>Palestras</h2>
            <div className="eventos-container">
              {filteredPalestras.map(evento => (
                <a key={evento.id} href={evento.link} className="evento-card" target="_blank" rel="noopener noreferrer">
                  <img src={evento.imagem} alt={evento.nome} className="evento-imagem" />
                  <div className="evento-info">
                    <h3>{evento.nome}</h3>
                    <p>{evento.descricao}</p>
                    <div className="evento-footer">
                      <span className="evento-data">Disponível</span>
                      <span className="evento-link">Saiba mais →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {(categoriaAtiva === 'todos' || categoriaAtiva === 'oficinas') && (!searchQuery.trim() || filteredOficinas.length > 0) && (
          <>
            <h2>Oficinas</h2>
            <div className="eventos-container">
              {filteredOficinas.map(evento => (
                <a key={evento.id} href={evento.link} className="evento-card" target="_blank" rel="noopener noreferrer">
                  <img src={evento.imagem} alt={evento.nome} className="evento-imagem" />
                  <div className="evento-info">
                    <h3>{evento.nome}</h3>
                    <p>{evento.descricao}</p>
                    <div className="evento-footer">
                      <span className="evento-data">Disponível</span>
                      <span className="evento-link">Saiba mais →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {(categoriaAtiva === 'todos' || categoriaAtiva === 'campanhas') && (!searchQuery.trim() || filteredCampanhas.length > 0) && (
          <>
            <h2>Campanhas</h2>
            <div className="eventos-container">
              {filteredCampanhas.map(evento => (
                <a key={evento.id} href={evento.link} className="evento-card" target="_blank" rel="noopener noreferrer">
                  <img src={evento.imagem} alt={evento.nome} className="evento-imagem" />
                  <div className="evento-info">
                    <h3>{evento.nome}</h3>
                    <p>{evento.descricao}</p>
                    <div className="evento-footer">
                      <span className="evento-data">Disponível</span>
                      <span className="evento-link">Saiba mais →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2025 RV - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Home;