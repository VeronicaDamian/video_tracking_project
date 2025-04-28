import React, { useState, useEffect } from 'react';
import { fetchSessions, createSession } from '../services/api/sessionsAPI';
import GoalInput from '../components/TimeTracking/GoalInput';
import TimerDisplay from '../components/TimeTracking/TimerDisplay';
import ControlButtons from '../components/TimeTracking/ControlButtons';
import SessionsTable from '../components/TimeTracking/SessionsTable';

const TimeTrackingPage = () => {
    // State management
    const [sessions, setSessions] = useState([]);
    const [isTracking, setIsTracking] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [goalTime, setGoalTime] = useState(4 * 60 * 60); // Default: 4 hours in seconds
    const [goalInput, setGoalInput] = useState('4:00');

    // Fetch sessions data on component mount
    useEffect(() => {
        const getSessions = async () => {
            try {
                const data = await fetchSessions();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        getSessions();
    }, []);

    // Timer logic
    useEffect(() => {
        let timer;

        if (isTracking) {
            timer = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(timer); // Cleanup on component unmount or when isTracking changes
    }, [isTracking]);

    // Calculate progress percentage
    const progressPercentage = Math.min((elapsedTime / goalTime) * 100, 100).toFixed(2);

    // Format time for display (converts seconds to HH:MM:SS)
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle goal time input change
    const handleGoalChange = (e) => {
        const value = e.target.value;
        setGoalInput(value);

        // Parse input to get total seconds
        const [hours, minutes] = value.split(':').map(Number);
        const totalSeconds = (hours || 0) * 3600 + (minutes || 0) * 60;
        setGoalTime(totalSeconds);
    };

    // Start tracking a new session
    const handleStartTracking = async () => {
        const sessionStart = new Date().toISOString();
        const newSession = { sessionStart, sessionEnd: null };
        setCurrentSession(newSession);
        setElapsedTime(0);
        setIsTracking(true);
    };

    // Stop tracking and save the session
    const handleStopTracking = async () => {
        const sessionEnd = new Date().toISOString();
        const updatedSession = { ...currentSession, sessionEnd };

        try {
            const savedSession = await createSession(updatedSession);
            setSessions((prevSessions) => [...prevSessions, savedSession]);
            setCurrentSession(null);
            setIsTracking(false);
        } catch (error) {
            console.error('Error saving session:', error);
        }
    };

    return (
        <div className="container py-5">
            <div className="card shadow-sm border-0 mb-5">
                <div className="card-header bg-primary text-white">
                    <h2 className="text-center mb-0 py-2">Time Tracking Dashboard</h2>
                </div>

                <div className="card-body p-4">
                    {/* Time Tracking Controls Section */}
                    <div className="row">
                        {/* Left Column - Goal Setting */}
                        <div className="col-md-5 mb-4 mb-md-0">
                            <div className="card h-100 border-light">
                                <div className="card-header bg-light">
                                    <h5 className="card-title mb-0">Set Your Goal</h5>
                                </div>
                                <div className="card-body d-flex flex-column justify-content-center">
                                    <GoalInput goalInput={goalInput} handleGoalChange={handleGoalChange} />

                                    <div className="mt-4">
                                        <ControlButtons
                                            isTracking={isTracking}
                                            handleStartTracking={handleStartTracking}
                                            handleStopTracking={handleStopTracking}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Timer Display */}
                        <div className="col-md-7">
                            <div className="card h-100 border-light">
                                <div className="card-header bg-light">
                                    <h5 className="card-title mb-0">Current Progress</h5>
                                </div>
                                <div className="card-body d-flex align-items-center justify-content-center">
                                    <TimerDisplay
                                        progressPercentage={progressPercentage}
                                        elapsedTime={elapsedTime}
                                        formatTime={formatTime}
                                        goalTime={goalTime}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sessions History Section */}
            <div className="card shadow-sm border-0">
                <div className="card-header bg-light">
                    <h4 className="card-title mb-0">Session History</h4>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <SessionsTable sessions={sessions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeTrackingPage;