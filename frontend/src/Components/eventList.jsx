import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EventList() {
    const [events, setEvents] = useState([]);

    // Carrega lista de eventos ao montar o componente
    useEffect(() => {
        fetchEvents();
    }, []);

    // Função para carregar eventos
    const fetchEvents = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("http://localhost:3001/eventos", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents(response.data);
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
            alert("Erro ao carregar eventos!");
        }
    };

    // Função de deletar
    const handleDelete = async (eventId) => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.delete(`http://localhost:3001/eventos/${eventId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Evento deletado com sucesso");
            setEvents(events.filter(event => event.eventoId !== eventId)); // Atualiza a lista sem nova requisição
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
            alert("Erro ao deletar evento!");
        }
    };

    // Interface
    return (
        <div>
            <h2>Lista de Eventos</h2>
            <Link to="/eventos/evCadastro">Novo evento</Link>
            <ul>
                {events.map(event => (
                    <li key={event.eventoId}>
                        {event.eventoName}
                        <Link to={`/eventos/evEdit/${event.eventoId}`}>Editar</Link>
                        <button onClick={() => handleDelete(event.eventoId)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;
