const Parceiro = require("../Models/Parceiro");

exports.createParceiro = async (req, res) => {
    try {
        const { parcName, parcEndereco } = req.body;

        if (!parcName || !parcEndereco) {
            return res.status(400).json({ error: "Nome e endereço do parceiro são obrigatórios." });
        }

        const parceiro = await Parceiro.create({ parcName, parcEndereco });
        res.status(201).json(parceiro);
    } catch (error) {
        console.error("Erro ao criar parceiro:", error);
        res.status(500).json({ error: "Erro interno ao criar parceiro." });
    }
};

exports.listParceiros = async (req, res) => {
    try {
        const parceiros = await Parceiro.findAll();
        res.status(200).json(parceiros);
    } catch (error) {
        console.error("Erro ao listar parceiros:", error);
        res.status(500).json({ error: "Erro interno ao listar parceiros." });
    }
};

exports.updateParceiro = async (req, res) => {
    try {
        const { parcId } = req.params;
        const { parcName, parcEndereco } = req.body;

        if (!parcName || !parcEndereco) {
            return res.status(400).json({ error: "Nome e endereço do parceiro são obrigatórios para atualização." });
        }

        const parceiro = await Parceiro.findByPk(parcId);
        if (!parceiro) {
            return res.status(404).json({ error: "Parceiro não encontrado." });
        }

        await parceiro.update({ parcName, parcEndereco });

        res.status(200).json(parceiro);
    } catch (error) {
        console.error("Erro ao atualizar parceiro:", error);
        res.status(500).json({ error: "Erro interno ao atualizar parceiro." });
    }
};

exports.deleteParceiro = async (req, res) => {
    try {
        const { parcId } = req.params;

        const parceiro = await Parceiro.findByPk(parcId);
        if (!parceiro) {
            return res.status(404).json({ error: "Parceiro não encontrado." });
        }

        await parceiro.destroy();
        res.status(200).json({ message: "Parceiro deletado com sucesso." });
    } catch (error) {
        console.error("Erro ao deletar parceiro:", error);
        res.status(500).json({ error: "Erro interno ao deletar parceiro." });
    }
};
