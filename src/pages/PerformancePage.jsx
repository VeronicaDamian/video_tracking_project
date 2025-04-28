import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TimeRangeFilter from '../components/Performance/TimeRangeFilter';
import KPISummary from '../components/Performance/KPISummary';
import DetailedMetrics from '../components/Performance/DetailedMetrics';
import PerformanceCharts from '../components/Performance/PerformanceCharts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

// Import custom hook
import { usePerformanceData } from '../hooks/usePerformanceData';

const PerformancePage = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const location = useLocation();

    // Use the custom hook to fetch and process data
    const {
        isLoading,
        error,
        kpis,
        refreshData,
        getSessionsChartData,
        getClientProjectsData,
        getEarningsChartData
    } = usePerformanceData(timeRange, customStartDate, customEndDate);

    // Auto-refresh when navigating to the page
    useEffect(() => {
        refreshData();
    }, [location.pathname, refreshData]);

    // Handle time range changes
    const handleTimeRangeChange = (newRange) => {
        setTimeRange(newRange);
    };

    // Handle custom date changes
    const handleDateChange = (type, value) => {
        if (type === 'start') {
            setCustomStartDate(value);
        } else {
            setCustomEndDate(value);
        }
    };

    if (isLoading) {
        return <LoadingSpinner message="Loading performance data..." />;
    }

    if (error) {
        return <ErrorAlert message={error} />;
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-primary text-white py-3 d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">Performance Dashboard</h2>
                    <button
                        className="btn btn-light"
                        onClick={refreshData}
                        title="Refresh data"
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Refresh
                    </button>
                </div>

                <div className="card-body p-4">
                    {/* Time Range Filter */}
                    <TimeRangeFilter
                        timeRange={timeRange}
                        customStartDate={customStartDate}
                        customEndDate={customEndDate}
                        onTimeRangeChange={handleTimeRangeChange}
                        onDateChange={handleDateChange}
                    />

                    {/* KPI Summary Cards */}
                    <KPISummary kpis={kpis} />

                    {/* Detailed Metrics */}
                    <DetailedMetrics kpis={kpis} />

                    {/* Charts */}
                    <PerformanceCharts
                        sessionsChartData={getSessionsChartData()}
                        clientProjectsData={getClientProjectsData()}
                        earningsChartData={getEarningsChartData()}
                    />
                </div>
            </div>
        </div>
    );
};

export default PerformancePage;