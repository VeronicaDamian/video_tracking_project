const API = 'http://localhost:5174/api/sessions';

export const fetchSessions = async () => {
    const response = await fetch(API);
    if (!response.ok) {
        throw new Error('Failed to fetch sessions');
    }
    return response.json();
};

export const createSession = async (session) => {
    const response = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
    });
    if (!response.ok) {
        throw new Error('Failed to create session');
    }
    return response.json();
};