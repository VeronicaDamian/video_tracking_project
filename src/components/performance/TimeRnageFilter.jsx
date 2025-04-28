import React from 'react';

const TimeRangeFilter = ({
    timeRange,
    customStartDate,
    customEndDate,
    onTimeRangeChange,
    onDateChange
}) => {
    // Get display text for selected range
    const getSelectedRangeText = () => {
        switch (timeRange) {
            case 'day':
                return 'Today';
            case 'week':
                return 'Last 7 Days';
            case 'month':
                return 'Last 30 Days';
            case 'year':
                return 'Last 365 Days';
            case 'custom':
                return customStartDate && customEndDate ?
                    `${new Date(customStartDate).toLocaleDateString()} - ${new Date(customEndDate).toLocaleDateString()}` :
                    'Select custom dates';
            default:
                return 'Last 7 Days';
        }
    };

    return (
        <div className="row mb-4">
            <div className="col-md-8">
                <div className="card shadow-sm">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">
                            <i className="bi bi-calendar-range me-2"></i>
                            Time Range
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="btn-group w-100">
                            <button
                                className={`btn ${timeRange === 'day' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onTimeRangeChange('day')}
                            >
                                Today
                            </button>
                            <button
                                className={`btn ${timeRange === 'week' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onTimeRangeChange('week')}
                            >
                                This Week
                            </button>
                            <button
                                className={`btn ${timeRange === 'month' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onTimeRangeChange('month')}
                            >
                                This Month
                            </button>
                            <button
                                className={`btn ${timeRange === 'year' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onTimeRangeChange('year')}
                            >
                                This Year
                            </button>
                            <button
                                className={`btn ${timeRange === 'custom' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => onTimeRangeChange('custom')}
                            >
                                Custom
                            </button>
                        </div>

                        {timeRange === 'custom' && (
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="startDate" className="form-label">Start Date</label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            className="form-control"
                                            value={customStartDate}
                                            onChange={(e) => onDateChange('start', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="endDate" className="form-label">End Date</label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            className="form-control"
                                            value={customEndDate}
                                            onChange={(e) => onDateChange('end', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm h-100">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">
                            <i className="bi bi-calendar-check me-2"></i>
                            Selected Period
                        </h5>
                    </div>
                    <div className="card-body d-flex align-items-center justify-content-center">
                        <h3 className="text-center mb-0">
                            {getSelectedRangeText()}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeRangeFilter;