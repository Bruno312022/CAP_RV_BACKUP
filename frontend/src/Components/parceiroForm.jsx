import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ParceiroForm() {
    const [parcName, setParcName] = useState("");
    const [parcEndereco, setParcEndereco] = useState("");
    const navigate = useNavigate();
    const { parcId } = useParams();

    useEffect(() => {
        console.log("ID recebido para edição:", parcId); // Debug
        if (parcId) {
            const fetchParceiro = async () => {
                try {
                    const token = sessionStorage.getItem("token");
                    const response = await axios.get(`http://localhost:3001/parceiros/${parcId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setParcName(response.data.parcName);
                    setParcEndereco(response.data.parcEndereco);
                } catch (error) {
                    console.error("Erro ao carregar parceiro:", error);
                    alert("Erro ao carregar os dados do parceiro.");
                }
            };
            fetchParceiro();
        }
    }, [parcId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const parcData = { parcName, parcEndereco };
        console.log("Dados enviados:", parcData); // Debug

        const token = sessionStorage.getItem("token");
        try {
            if (parcId) {
                await axios.put(`http://localhost:3001/parceiros/${parcId}`, parcData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Parceria atualizada com sucesso!");
            } else {
                await axios.post(`http://localhost:3001/parceiros`, parcData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Parceria criada com sucesso!");
            }
            navigate("/parceiros");
        } catch (error) {
            console.error("Erro ao salvar parceria:", error);
            alert("Erro ao salvar parceria.");
        }

    };

    return (
        <div>
            <h2>{parcId ? "Editar Parceria" : "Nova Parceria"}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="parcName">Nome do parceiro:</label>
                <input
                    type="text"
                    id="parcName"
                    value={parcName}
                    onChange={(e) => setParcName(e.target.value)}
                    required
                />

                <label htmlFor="parcEndereco">Endereço do parceiro:</label>
                <input
                    type="text"
                    id="parcEndereco"
                    value={parcEndereco}
                    onChange={(e) => setParcEndereco(e.target.value)}
                    required
                />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default ParceiroForm;
