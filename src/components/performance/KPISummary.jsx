import React from 'react';
import { formatTime, formatCurrency } from '../../utils/formatters';

const KPISummary = ({ kpis }) => {
    return (
        <div className="row g-4 mb-4">
            <div className="col-md-4">
                <div className="card bg-primary text-white shadow-sm h-100">
                    <div className="card-body text-center">
                        <h3 className="display-4 fw-bold mb-0">
                            {formatTime(kpis.totalSecondsEdited)}
                        </h3>
                        <p className="lead mb-0">Video Content Edited</p>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card bg-success text-white shadow-sm h-100">
                    <div className="card-body text-center">
                        <h3 className="display-4 fw-bold mb-0">
                            {formatCurrency(kpis.totalEarnings)}
                        </h3>
                        <p className="lead mb-0">Total Earnings</p>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card bg-info text-white shadow-sm h-100">
                    <div className="card-body text-center">
                        <h3 className="display-4 fw-bold mb-0">
                            {formatTime(kpis.totalWorkTimeSeconds)}
                        </h3>
                        <p className="lead mb-0">Total Work Time</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KPISummary;