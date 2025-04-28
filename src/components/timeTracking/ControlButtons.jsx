import React from 'react';

const ControlButtons = ({ isTracking, handleStartTracking, handleStopTracking }) => {
    return (
        <div className="d-grid gap-2">
            {!isTracking ? (
                <button
                    className="btn btn-success btn-lg shadow-sm"
                    onClick={handleStartTracking}
                >
                    <i className="bi bi-play-fill me-2"></i>
                    Start Tracking
                </button>
            ) : (
                <button
                    className="btn btn-danger btn-lg shadow-sm"
                    onClick={handleStopTracking}
                >
                    <i className="bi bi-stop-fill me-2"></i>
                    Stop Tracking
                </button>
            )}
        </div>
    );
};

export default ControlButtons;