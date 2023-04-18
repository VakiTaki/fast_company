import React from "react";

const Quality = ({ quality }) => {
    return (
        <>
            <span className={`badge bg-${quality.color} me-2`}>
                {quality.name}
            </span>
        </>
    );
};

export default Quality;
