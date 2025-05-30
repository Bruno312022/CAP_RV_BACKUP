const Event = require("../Models/Event");

exports.createEvent = async (req, res) => {
    try {
        const { eventoName, eventoEndereco, eventoData, eventoHora } = req.body;
        const event = await Event.create({ eventoName, eventoEndereco, eventoData, eventoHora });
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar evento." });
    }
};

exports.listEvent = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar eventos." });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const { eventoName, eventoEndereco, eventoData, eventoHora } = req.body;
        const updatedRows = await Event.update(
            { eventoName, eventoEndereco, eventoData, eventoHora },
            { where: { eventoId } }
        );

        if (!updatedRows[0]) return res.status(404).json({ error: "Evento não encontrado." });

        const updatedEvent = await Event.findByPk(eventoId);
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar evento." });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { eventoId } = req.params;
        const event = await Event.findByPk(eventoId);
        if (!event) return res.status(404).json({ error: "Evento não encontrado." });

        await event.destroy();
        res.json({ message: "Evento deletado com sucesso." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar evento." });
    }
};
