import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
Chart.register(...registerables);

const PerformanceCharts = ({
    sessionsChartData,
    clientProjectsData,
    earningsChartData
}) => {
    // Chart options
    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Work Sessions by Day',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Minutes',
                },
            },
        },
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Projects by Client',
            },
        },
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Earnings Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Earnings ($)',
                },
            },
        },
    };

    return (
        <div className="row g-4">
            {/* Work Sessions Chart */}
            <div className="col-lg-8">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">
                            <i className="bi bi-bar-chart-fill me-2"></i>
                            Daily Work Time
                        </h5>
                    </div>
                    <div className="card-body">
                        <div style={{ height: '300px' }}>
                            <Bar data={sessionsChartData} options={barChartOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects by Client Chart */}
            <div className="col-lg-4">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">
                            <i className="bi bi-pie-chart-fill me-2"></i>
                            Projects by Client
                        </h5>
                    </div>
                    <div className="card-body">
                        <div style={{ height: '300px' }}>
                            <Doughnut data={clientProjectsData} options={doughnutChartOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings Chart */}
            <div className="col-12">
                <div className="card shadow-sm">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">
                            <i className="bi bi-graph-up me-2"></i>
                            Earnings Trend
                        </h5>
                    </div>
                    <div className="card-body">
                        <div style={{ height: '300px' }}>
                            <Line data={earningsChartData} options={lineChartOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceCharts;