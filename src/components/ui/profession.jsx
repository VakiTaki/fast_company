import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

function Profession({ id }) {
    const { isLoading, getProfessionById } = useProfession();
    const prof = getProfessionById(id);
    return <div>{!isLoading ? prof.name : "Loading..."}</div>;
}

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
