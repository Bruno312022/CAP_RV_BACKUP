import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ParceiroList() {
    const [parceiros, setParceiros] = useState([]);

    // Carrega a lista de parceiros ao montar o componente
    useEffect(() => {
        fetchParceiros();
    }, []);

    // Função para buscar parceiros no backend
    const fetchParceiros = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/parceiros", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setParceiros(response.data);
        } catch (error) {
            console.error("Erro ao carregar parceiros:", error);
            alert("Erro ao carregar parceiros!");
        }
    };

    // Função para deletar parceiro
    const handleDelete = async (parceiroId) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`http://localhost:3001/parceiros/${parceiroId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Parceria deletada com sucesso!");
            fetchParceiros(); // Atualiza a lista após deletar
        } catch (error) {
            console.error("Erro ao deletar parceiro:", error);
            alert("Erro ao deletar parceria!");
        }
    };

    return (
        <div>
            <h2>Lista de Parcerias</h2>
            <Link to="/parceiros/parcCadastro">Criar Nova Parceria</Link>
            <ul>
                {parceiros.length > 0 ? (
                    parceiros.map((parceiro) => (
                        <li key={parceiro.parcId}>
                            {parceiro.parcName} - {parceiro.parcEndereco}
                           <Link to={`/parceiros/parcEdit/${parceiro.parcId}`}>Editar</Link>
                            <button onClick={() => handleDelete(parceiro.parcId)}>Deletar</button>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma parceria encontrada.</p>
                )}
            </ul>
        </div>
    );
}

export default ParceiroList;
