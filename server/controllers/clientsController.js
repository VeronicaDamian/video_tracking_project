import * as dataService from "../services/dataService.js";

export const getClients = async (req, res) => {
    try {
        const clients = await dataService.getData("clients");
        res.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).send("Error fetching clients data");
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await dataService.getEntity("clients", req.params.id);
        if (!client) {
            return res.status(404).send("Client not found");
        }
        res.json(client);
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).send("Error fetching client data");
    }
};

export const createClient = async (req, res) => {
    try {
        const newClient = await dataService.createClient(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).send("Error creating client");
    }
};

export const updateClient = async (req, res) => {
    try {
        const updatedClient = await dataService.updateEntity(
            "clients",
            req.params.id,
            req.body
        );
        res.json(updatedClient);
    } catch (error) {
        if (error.message === "client not found") {
            return res.status(404).send("Client not found");
        }
        console.error("Error updating client:", error);
        res.status(500).send("Error updating client");
    }
};

export const deleteClient = async (req, res) => {
    try {
        await dataService.deleteEntity("clients", req.params.id);
        res.status(204).send();
    } catch (error) {
        if (error.message === "client not found") {
            return res.status(404).send("Client not found");
        }
        console.error("Error deleting client:", error);
        res.status(500).send("Error deleting client");
    }
};
