import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

function EventForm() {
    const [eventoNome, setEventoNome] = useState('');
    const [eventoEndereco, setEventoEndereco] = useState('');
    const [eventoHora, setEventoHora] = useState('');
    const [eventoData, setEventoData] = useState('');
    const navigate = useNavigate();
    const { eventoId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { eventoName: eventoNome, eventoEndereco, eventoData, eventoHora };
        const token = sessionStorage.getItem("token");

        try {
            if (eventoId) {
                await axios.put(`http://localhost:3001/eventos/${eventoId}`, eventData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(`http://localhost:3001/eventos`, eventData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                alert("Evento criado com sucesso");
            }
            navigate('/eventos');
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            alert("Erro ao salvar evento.");
        }
    };

    return (
        <div>
            <h2>{eventoId ? "Editar Evento" : "Novo Evento"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome do Evento</label>
                <input type="text" value={eventoNome} onChange={(e) => setEventoNome(e.target.value)} required />

                <label>Local do Evento</label>
                <input type="text" value={eventoEndereco} onChange={(e) => setEventoEndereco(e.target.value)} required />

                <label>Data do Evento</label>
                <input type="date" value={eventoData} onChange={(e) => setEventoData(e.target.value)} required />

                <label>Horário do Evento</label>
                <input type="time" value={eventoHora} onChange={(e) => setEventoHora(e.target.value)} required />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EventForm;
