import React from 'react';

const GoalInput = ({ goalInput, handleGoalChange }) => {
    return (
        <div className="form-group">
            <label htmlFor="goalTime" className="form-label fw-bold mb-3">
                Daily Work Goal
            </label>
            <div className="input-group">
                <span className="input-group-text bg-light">
                    <i className="bi bi-clock"></i>
                </span>
                <input
                    type="text"
                    id="goalTime"
                    className="form-control form-control-lg text-center"
                    value={goalInput}
                    onChange={handleGoalChange}
                    placeholder="Hours:Minutes"
                />
                <span className="input-group-text bg-light">hrs:min</span>
            </div>
            <small className="form-text text-muted mt-2">Format: hours:minutes (e.g., 4:00 for 4 hours)</small>
        </div>
    );
};

export default GoalInput;