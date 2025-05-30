const Event = require("../Models/Event");

exports.createEvent = async (req, res) => {
    try {
      const { eventoNome, eventoEndereco, eventoData, eventoHora } = req.body;
        const event = await Event.create({ eventoNome, eventoEndereco, eventoData, eventoHora  });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar evento." });
    }
};

exports.listEvent = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: "Erro ao listar eventos." });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const { eventoNome, eventoEndereco, eventoData, eventoHora } = req.body;
        const event = await Event.findByPk(eventId);
        if (!event) return res.status(404).json({ error: "Evento não encontrado." });

        event.eventoNome = eventoNome;
        event.eventoEndereco = eventoEndereco;
        event.eventoData = eventoData;
        event.eventoHora = eventoHora;
        await event.save();

        res.json(event);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar evento." });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByPk(eventId);
        if (!event) return res.status(404).json({ error: "Usuário não encontrado." });

        await event.destroy();
        res.json({ message: "Evento deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar evento." });
    }
};