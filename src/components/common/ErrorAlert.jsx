import React from 'react';

const ErrorAlert = ({ message }) => {
    return (
        <div className="container py-5">
            <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {message}
            </div>
        </div>
    );
};

export default ErrorAlert;