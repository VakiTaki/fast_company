import React from "react";
import PropTypes from "prop-types";

const Quality = ({ quality }) => {
    return (
        <>
            <span className={`badge bg-${quality.color} me-2`}>
                {quality.name}
            </span>
        </>
    );
};
Quality.propTypes = {
    quality: PropTypes.object.isRequired
};

export default Quality;
