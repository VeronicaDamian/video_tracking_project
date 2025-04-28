import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TimerDisplay = ({
    progressPercentage,
    elapsedTime,
    formatTime,
    goalTime,
}) => {
    // Determine progress color based on percentage
    const getProgressColor = () => {
        if (progressPercentage < 30) return "#20c997"; // teal
        if (progressPercentage < 70) return "#0d6efd"; // blue
        if (progressPercentage < 90) return "#fd7e14"; // orange
        return "#dc3545"; // red
    };

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <div style={{ width: "200px", height: "200px" }} className="mb-3">
                <CircularProgressbar
                    value={progressPercentage}
                    text={`${progressPercentage}%`}
                    styles={buildStyles({
                        textSize: "16px",
                        pathColor: getProgressColor(),
                        textColor: getProgressColor(),
                        trailColor: "#e9ecef",
                        backgroundColor: "#f8f9fa",
                        pathTransition: "stroke-dashoffset 0.5s ease 0s",
                    })}
                />
            </div>

            <div className="text-center">
                <div className="card bg-light border-0 shadow-sm">
                    <div className="card-body py-2">
                        <h3 className="mb-0 fw-bold">
                            <i className="bi bi-stopwatch me-2"></i>
                            {formatTime(elapsedTime)}
                        </h3>
                    </div>
                </div>

                <div className="mt-3 text-muted">
                    {progressPercentage >= 100 ? (
                        <div className="alert alert-success py-2">
                            <i className="bi bi-check-circle me-2"></i>
                            Goal reached! Great work!
                        </div>
                    ) : (
                        <span>
                            Working toward your {formatTime(Math.floor(goalTime))} goal
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimerDisplay;