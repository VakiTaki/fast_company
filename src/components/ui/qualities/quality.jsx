import React from "react";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const Quality = ({ id }) => {
    const { isLoading, getQualityById } = useQuality();
    const qual = getQualityById(id);
    return (
        <>
            {!isLoading ? (
                <span className={`badge bg-${qual.color} me-2`}>
                    {qual.name}
                </span>
            ) : (
                "Loading..."
            )}
        </>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
