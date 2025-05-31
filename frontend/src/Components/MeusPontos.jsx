import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLeaf, FaCoins, FaShoppingBasket, FaRecycle, FaGift } from 'react-icons/fa';
import Sidebar from './Sidebar';
import '../CSS/MeusPontos.css';

function MeusPontos() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [pontos] = useState(100); // Exemplo: 100 moedas
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const estabelecimentos = [
        {
            id: 1,
            nome: 'Supermercado Queiroz',
            imagem: '/sup1.jpg',
            descricao: 'Supermercado parceiro com produtos sustentáveis e orgânicos',
            produtos: [
                { nome: 'Cesta Básica', pontos: 1000, icon: <FaShoppingBasket /> },
                { nome: 'Kit Limpeza Eco', pontos: 500, icon: <FaRecycle /> },
                { nome: 'Vale Compras R$50', pontos: 800, icon: <FaGift /> }
            ]
        },
        {
            id: 2,
            nome: 'Super Nova Cidade',
            imagem: '/sup2.png',
            descricao: 'Produtos frescos e sustentáveis para sua família',
            produtos: [
                { nome: 'Cesta Orgânicos', pontos: 1200, icon: <FaShoppingBasket /> },
                { nome: 'Kit Horta', pontos: 300, icon: <FaRecycle /> },
                { nome: 'Vale Compras R$100', pontos: 1500, icon: <FaGift /> }
            ]
        },
        {
            id: 3,
            nome: 'Supermercado Nova Era',
            imagem: '/sup3.jpeg',
            descricao: 'Qualidade e sustentabilidade em um só lugar',
            produtos: [
                { nome: 'Kit Produtos Naturais', pontos: 700, icon: <FaShoppingBasket /> },
                { nome: 'Cesta Frutas', pontos: 400, icon: <FaRecycle /> },
                { nome: 'Vale Compras R$30', pontos: 500, icon: <FaGift /> }
            ]
        }
    ];

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/');
            return;
        }
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, [navigate]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        document.querySelector('.sidebar').classList.toggle('active');
        document.body.classList.toggle('sidebar-active', !isSidebarOpen);
    };

    if (loading) {
        return (
            <div className="loading">
                <FaCoins className="loading-icon" />
                Carregando...
            </div>
        );
    }

    return (
        <div className="pontos-container">
            <nav className="nav">
                <div className="logo-sidebar">
                    <div className="toggle" onClick={toggleSidebar}>&#9776;</div>
                    <Link to="/home" className="logo">
                        <h1>RECOMPENSA</h1>
                        <h1>VERDE</h1>
                        <FaLeaf className="leaf-icon" />
                    </Link>
                </div>
                <div className="navigation">
                    <Link to="/atendimento">Fale conosco</Link>
                    <Link to="/sobre">Sobre</Link>
                </div>
            </nav>

            <Sidebar />

            <div className="pontos-content">
                <div className="moedas-display">
                    <div className="total-moedas">
                        <FaCoins style={{ color: '#fff', marginRight: '10px' }} />
                        <span>{pontos} Pontos Verdes</span>
                    </div>
                </div>

                <div className="pontos-header">
                    <h1>Troque seus Pontos</h1>
                    <p>Confira os estabelecimentos parceiros e as opções de troca disponíveis</p>
                </div>

                <div className="estabelecimentos-grid">
                    {estabelecimentos.map((estabelecimento) => (
                        <div 
                            key={estabelecimento.id} 
                            className="estabelecimento-card"
                        >
                            <img
                                src={estabelecimento.imagem}
                                alt={estabelecimento.nome}
                                className="estabelecimento-image"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Imagem+não+disponível';
                                }}
                            />
                            <div className="estabelecimento-info">
                                <h3>{estabelecimento.nome}</h3>
                                <p className="estabelecimento-descricao">{estabelecimento.descricao}</p>
                                <ul className="produtos-lista">
                                    {estabelecimento.produtos.map((produto, idx) => (
                                        <li key={idx} className="produto-item">
                                            <div className="produto-info">
                                                <span className="produto-icon">{produto.icon}</span>
                                                <span className="produto-nome">{produto.nome}</span>
                                            </div>
                                            <div className="produto-pontos">
                                                <FaCoins className="moeda-icon-small" />
                                                <span>{produto.pontos}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <button className="trocar-btn">
                                    Trocar Pontos
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MeusPontos; 