import React from 'react';

const ProjectsPagePagination = ({ totalPages, currentPage, handlePageChange }) => {
    // Generate page numbers, but limit how many are shown
    const getPageNumbers = () => {
        let pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always include first and last page
            // Show current page and neighbors
            const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (startPage > 1) {
                pages = [1, '...', ...pages.slice(2)];
            }

            if (endPage < totalPages) {
                pages = [...pages.slice(0, -1), '...', totalPages];
            }
        }

        return pages;
    };

    return (
        <nav aria-label="Project pages" className="mt-4">
            <ul className="pagination justify-content-center">
                {/* Previous button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous"
                        disabled={currentPage === 1}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                {/* Page numbers */}
                {getPageNumbers().map((number, index) => (
                    number === '...' ? (
                        <li key={`ellipsis-${index}`} className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    ) : (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    )
                ))}

                {/* Next button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        aria-label="Next"
                        disabled={currentPage === totalPages}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default ProjectsPagePagination;