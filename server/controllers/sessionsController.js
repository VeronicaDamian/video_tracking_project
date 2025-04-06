import * as dataService from '../services/dataService.js';

export const getSessions = async (req, res) => {
    const sessions = await dataService.getData('sessions');
    res.json(sessions);
};

export const getSessionById = async (req, res) => {
    const session = await dataService.getEntity('sessions', req.params.id);
    res.json(session);
};

export const createSession = async (req, res) => {
    const newSession = await dataService.createSession(req.body);
    res.status(201).json(newSession);
};

export const updateSession = async (req, res) => {
    const updatedSession = await dataService.updateEntity('sessions', req.params.id, req.body);
    res.json(updatedSession);
};

export const deleteSession = async (req, res) => {
    await dataService.deleteEntity('sessions', req.params.id);
    res.status(204).send();
};