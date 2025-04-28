import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    fetchPerformanceData,
    fetchPerformanceByTimeRange
} from '../services/api/performanceAPI';
import { useProjectContext } from '../context/ProjectContext';

export const usePerformanceData = (timeRange, customStartDate, customEndDate) => {
    const [performanceData, setPerformanceData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [localRefreshTrigger, setLocalRefreshTrigger] = useState(0);
    const { projectsVersion } = useProjectContext();

    const refreshData = useCallback(() => {
        setLocalRefreshTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            let data;

            if (timeRange === 'custom' && customStartDate && customEndDate) {
                data = await fetchPerformanceByTimeRange(customStartDate, customEndDate);
            } else {
                data = await fetchPerformanceData();
                const filteredData = filterDataByTimeRange(data, timeRange);
                data = {
                    ...data,
                    ...filteredData
                };
            }
            setPerformanceData(data);
            setIsLoading(false);
        };

        fetchData();
    }, [timeRange, customStartDate, customEndDate, localRefreshTrigger, projectsVersion]);

    // Calculate derived KPIs
    const kpis = useMemo(() => {
        if (!performanceData) return {
            totalSecondsEdited: 0,
            totalWorkTimeSeconds: 0,
            totalEarnings: 0,
            productivityRate: 0,
            completedProjects: 0,
            unpaidEarnings: 0
        };

        return performanceData.stats;
    }, [performanceData]);

    const getSessionsChartData = () => {
        if (!performanceData || !performanceData.sessions) {
            return {
                labels: [],
                datasets: [{
                    label: 'Work Time (minutes)',
                    data: [],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                }]
            };
        }

        // Group sessions by day
        const sessionsByDay = performanceData.sessions.reduce((acc, session) => {
            const date = new Date(session.sessionStart).toLocaleDateString();

            if (!acc[date]) {
                acc[date] = 0;
            }

            if (session.sessionEnd) {
                const startTime = new Date(session.sessionStart).getTime();
                const endTime = new Date(session.sessionEnd).getTime();
                acc[date] += (endTime - startTime) / 1000 / 60; // Convert to minutes
            }

            return acc;
        }, {});

        // Sort dates
        const sortedDates = Object.keys(sessionsByDay).sort((a, b) =>
            new Date(a) - new Date(b)
        );

        return {
            labels: sortedDates,
            datasets: [
                {
                    label: 'Work Time (minutes)',
                    data: sortedDates.map(date => sessionsByDay[date]),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
            ],
        };
    };

    const getClientProjectsData = () => {
        if (!performanceData || !performanceData.projects) {
            return {
                labels: [],
                datasets: [{
                    label: 'Projects Count',
                    data: [],
                    backgroundColor: [],
                    borderWidth: 1,
                }]
            };
        }

        // Group projects by client
        const projectsByClient = performanceData.projects.reduce((acc, project) => {
            const clientName = project.client?.name || 'No Client';

            if (!acc[clientName]) {
                acc[clientName] = {
                    count: 0,
                    duration: 0,
                    earnings: 0
                };
            }

            acc[clientName].count += 1;
            acc[clientName].duration += project.duration || 0;

            const rate = project.client?.paymentRate || 0;
            const hours = (project.duration || 0) / 3600;
            acc[clientName].earnings += (rate * hours);

            return acc;
        }, {});

        const clientNames = Object.keys(projectsByClient);

        return {
            labels: clientNames,
            datasets: [
                {
                    label: 'Projects Count',
                    data: clientNames.map(client => projectsByClient[client].count),
                    backgroundColor: clientNames.map((_, i) =>
                        `hsl(${i * (360 / clientNames.length)}, 70%, 60%)`
                    ),
                    borderWidth: 1,
                },
            ],
        };
    };

    const getEarningsChartData = () => {
        if (!performanceData || !performanceData.projects) {
            return {
                labels: [],
                datasets: [{
                    label: 'Earnings',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                }]
            };
        }

        // Group projects by month
        const earningsByMonth = performanceData.projects.reduce((acc, project) => {
            const date = new Date(project.completionDate || project.createdAt);
            const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });

            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }

            // Use the same calculation as in your other functions
            if (project.client?.paymentRate) {
                acc[monthYear] += (project.duration || 0) * project.client.paymentRate;
            }

            return acc;
        }, {});

        // Sort months chronologically
        const sortedMonths = Object.keys(earningsByMonth).sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return dateA - dateB;
        });

        return {
            labels: sortedMonths,
            datasets: [
                {
                    label: 'Earnings',
                    data: sortedMonths.map(month => earningsByMonth[month]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                },
            ],
        };
    };

    return {
        performanceData,
        isLoading,
        kpis,
        refreshData,
        getSessionsChartData,
        getClientProjectsData,
        getEarningsChartData
    };
};

const filterDataByTimeRange = (data, timeRange) => {
    if (!data || !data.projects || !data.sessions) {
        return { projects: [], sessions: [] };
    }

    const now = new Date();
    let startDate;

    switch (timeRange) {
        case 'day':
            startDate = new Date(now);
            startDate.setHours(0, 0, 0, 0);
            break;
        case 'week':
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
        case 'month':
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
            break;
        case 'year':
            startDate = new Date(now);
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        default:
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
    }

    const filteredSessions = data.sessions.filter(session => {
        const sessionDate = new Date(session.sessionStart);
        return sessionDate >= startDate && sessionDate <= now;
    });

    const filteredProjects = data.projects.filter(project => {
        // For projects, we'll consider completion date if available, otherwise creation date
        const projectDate = new Date(project.completionDate || project.createdAt);
        return projectDate >= startDate && projectDate <= now;
    });

    // Recalculate stats based on filtered data
    const stats = calculateStatistics(filteredProjects, filteredSessions);

    return {
        projects: filteredProjects,
        sessions: filteredSessions,
        stats
    };
};

// Helper function to calculate statistics
const calculateStatistics = (projects, sessions) => {
    // Total seconds of video content edited
    const totalSecondsEdited = projects.reduce((total, project) =>
        project.status === 'Done' ? total + (project.duration || 0) : total, 0);

    // Total work time from sessions (in seconds)
    const totalWorkTimeSeconds = sessions.reduce((total, session) => {
        if (session.sessionEnd) {
            const startTime = new Date(session.sessionStart).getTime();
            const endTime = new Date(session.sessionEnd).getTime();
            return total + ((endTime - startTime) / 1000); // Convert ms to seconds
        }
        return total;
    }, 0);

    // Total earnings
    const totalEarnings = projects.reduce((total, project) => {
        if (project.paymentStatus === 'paid' && project.status === 'Done') {
            return total + (project.duration * project.client.paymentRate);
        }
        return total;
    }, 0);

    // Productivity rate (seconds edited per hour of work)
    const productivityRate = totalWorkTimeSeconds > 0
        ? (totalSecondsEdited / (totalWorkTimeSeconds / 3600)).toFixed(2)
        : 0;

    // Completed projects count
    const completedProjects = projects.filter(project =>
        project.status === 'Done').length;

    // Unpaid earnings
    const unpaidEarnings = projects.reduce((total, project) => {
        if (project.paymentStatus === 'unpaid' && project.status === 'Done') {
            return total + (project.duration * project.client.paymentRate);
        }
        return total;
    }, 0);

    return {
        totalSecondsEdited,
        totalWorkTimeSeconds,
        totalEarnings,
        productivityRate,
        completedProjects,
        unpaidEarnings,
        totalProjects: projects.length,
        totalSessions: sessions.length
    };
};