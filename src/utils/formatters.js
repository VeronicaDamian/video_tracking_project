export const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatDate = (date, includeTime = false) => {
    if (!date) return 'N/A';

    const dateObj = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    if (includeTime) {
        return dateObj.toLocaleString('en-US', {
            ...options,
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return dateObj.toLocaleDateString('en-US', options);
};

export const minutesToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
};