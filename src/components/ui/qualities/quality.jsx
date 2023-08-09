import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQialityById } from "../../../store/qualitiesSlice";

const Quality = ({ id }) => {
    const qual = useSelector(getQialityById(id));
    return (
        <>
            {qual && (
                <span className={`badge bg-${qual.color} me-2`}>
                    {qual.name}
                </span>
            )}
        </>
    );
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
