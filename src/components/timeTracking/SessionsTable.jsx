import React, { useState } from 'react';
import SessionsTablePagination from './SessionsTablePagination';

const SessionsTable = ({ sessions }) => {
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const sessionsPerPage = 5;

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${date.toLocaleDateString(undefined, options)} | ${time}`;
    };

    // Calculate duration between start and end time
    const calculateDuration = (start, end) => {
        if (!end) return 'In Progress';

        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const durationMs = endTime - startTime;

        // Convert to hours, minutes, seconds
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${hours}h ${minutes}m`;
    };

    const handleSearchDateChange = (e) => {
        setSearchDate(e.target.value);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const filteredSessions = sessions.filter((session) => {
        return searchDate
            ? new Date(session.sessionStart).toLocaleDateString() === new Date(searchDate).toLocaleDateString()
            : true;
    });

    // Sort sessions by start date (newest first)
    const sortedSessions = [...filteredSessions].sort((a, b) =>
        new Date(b.sessionStart) - new Date(a.sessionStart)
    );

    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sortedSessions.slice(indexOfFirstSession, indexOfLastSession);

    const totalPages = Math.ceil(sortedSessions.length / sessionsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {/* Date Filter */}
            <div className="row mb-3 bg-light py-3 mx-0">
                <div className="col-md-4">
                    <div className="input-group">
                        <span className="input-group-text bg-white">
                            <i className="bi bi-calendar3"></i>
                        </span>
                        <input
                            type="date"
                            id="searchDate"
                            className="form-control"
                            value={searchDate}
                            onChange={handleSearchDateChange}
                        />
                        {searchDate && (
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => setSearchDate('')}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="col-md-8 text-md-end mt-2 mt-md-0">
                    <span className="badge bg-primary fs-6">
                        Total Sessions: {sortedSessions.length}
                    </span>
                </div>
            </div>

            {/* Table */}
            {sortedSessions.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Clock In</th>
                                    <th scope="col">Clock Out</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSessions.map((session, index) => (
                                    <tr key={session.id || index}>
                                        <td>{indexOfFirstSession + index + 1}</td>
                                        <td>{formatDateTime(session.sessionStart)}</td>
                                        <td>
                                            {session.sessionEnd ? formatDateTime(session.sessionEnd) : '-'}
                                        </td>
                                        <td>{calculateDuration(session.sessionStart, session.sessionEnd)}</td>
                                        <td>
                                            {session.sessionEnd ? (
                                                <span className="badge bg-success">Completed</span>
                                            ) : (
                                                <span className="badge bg-warning text-dark">In Progress</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <SessionsTablePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            ) : (
                <div className="alert alert-info text-center">
                    <i className="bi bi-info-circle me-2"></i>
                    No sessions found. Start tracking to see your sessions here.
                </div>
            )}
        </div>
    );
};

export default SessionsTable;