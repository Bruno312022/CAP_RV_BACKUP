import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';



function EventForm() {

    const [eventoNome, setEventoname] = useState('');
    const [eventoEndereco, setEventoendereco] = useState('');
    const [eventoHora, setEventohora] = useState('');
    const [eventoData, setEventodata] = useState('');
    const navigate = useNavigate();
    const { eventoId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const eventData = { eventoNome, eventoEndereco, eventoData, eventoHora };
        const token = sessionStorage.getItem("token");
        try {
            if (eventoId) {
                await axios.put(`http://localhost:3001/eventos/${eventoId}`, eventData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post(`http://localhost:3001/eventos`, eventData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Evento criado com sucesso");
            }
            navigate('/eventos')
        } catch (error) {
            alert("Erro ao salvar evento ");

        };
    };
    return (
        <div>
            <h2>{eventoId ? "Editar Evento" : "Novo Evento"}</h2>
            <form onSubmit={handleSubmit}>
                <label>Nome do Evento</label>
                <input type="text" value={eventoNome}
                    onChange={(e) => setEventoname(e.target.value)} required />

                <label>Local o Evento</label>
                <input type="text" value={eventoEndereco}
                    onChange={(e) => setEventoendereco(e.target.value)} required />

                <label>Data do Evento</label>
                <input type="date" value={eventoData}
                    onChange={(e) => setEventodata(e.target.value)} required />

                <label>Horário do Evento</label>
                <input type="time" value={eventoHora}
                    onChange={(e) => setEventohora(e.target.value)} required />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default EventForm;

