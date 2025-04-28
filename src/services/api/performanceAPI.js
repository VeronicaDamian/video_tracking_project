const API_URL = 'http://localhost:5174/api';

export const fetchPerformanceData = async () => {
    const response = await fetch(`${API_URL}/performance`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
};

export const fetchPerformanceByTimeRange = async (startDate, endDate) => {
    const url = new URL(`${API_URL}/performance/time-range`);
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};

export const fetchPerformanceByClient = async () => {
    const response = await fetch(`${API_URL}/performance/by-client`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};

export const fetchEarningsData = async () => {
    const response = await fetch(`${API_URL}/performance/earnings`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};

export const fetchProductivityData = async () => {
    const response = await fetch(`${API_URL}/performance/productivity`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
};