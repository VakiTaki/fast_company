import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/professionsSlice";

function Profession({ id }) {
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    return <div>{!isLoading ? prof.name : "Loading..."}</div>;
}

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
