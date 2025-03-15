import fs from 'fs';
import path from 'path';

const clientsFilePath = path.resolve('server/db/clients.json');

export const getClients = (req, res) => {
  fs.readFile(clientsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading clients data:', err);
      res.status(500).send('Error reading clients data');
      return;
    }
    res.json(JSON.parse(data));
  });
};

export const createClient = (req, res) => {
  fs.readFile(clientsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading clients data:', err);
      res.status(500).send('Error reading clients data');
      return;
    }
    const clients = JSON.parse(data);
    const newClient = { id: clients.length + 1, ...req.body };
    clients.push(newClient);
    fs.writeFile(clientsFilePath, JSON.stringify(clients, null, 2), (err) => {
      if (err) {
        console.error('Error saving client:', err);
        res.status(500).send('Error saving client');
        return;
      }
      res.status(201).json(newClient);
    });
  });
};