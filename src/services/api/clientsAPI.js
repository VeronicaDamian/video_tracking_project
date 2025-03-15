const API = 'http://localhost:5174/api/clients';

export const fetchClients = async () => {
  const response = await fetch(API);
  if (!response.ok) {
    throw new Error('Failed to fetch clients');
  }
  return response.json();
};

export const createClient = async (client) => {
  const response = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) {
    throw new Error('Failed to create client');
  }
  return response.json();
};