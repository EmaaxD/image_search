import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message }) => (
    <div className="row">
        <div className="col-md-12 d-flex justify-content-center">
            <div className="alert alert-primary text-center">
                <p>{message}.</p>
            </div>
        </div>
    </div>
)
 
Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;