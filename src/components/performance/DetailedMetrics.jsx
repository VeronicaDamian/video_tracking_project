import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const DetailedMetrics = ({ kpis }) => {
    return (
        <div className="row g-4 mb-4">
            <div className="col-md-4">
                <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                        <div className="display-5 fw-bold text-primary mb-2">
                            {kpis.productivityRate}
                        </div>
                        <p className="lead">Edited Seconds/Hour</p>
                        <p className="text-muted small">Higher is better</p>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                        <div className="display-5 fw-bold text-success mb-2">
                            {kpis.completedProjects}
                        </div>
                        <p className="lead">Completed Projects</p>
                        <p className="text-muted small">In selected period</p>
                    </div>
                </div>
            </div>

            <div className="col-md-4">
                <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                        <div className="display-5 fw-bold text-danger mb-2">
                            {formatCurrency(kpis.unpaidEarnings)}
                        </div>
                        <p className="lead">Unpaid Earnings</p>
                        <p className="text-muted small">Pending payment</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedMetrics;