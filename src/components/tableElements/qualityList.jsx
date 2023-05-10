import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

function QualityList({ qualities }) {
    return (
        <>
            {qualities.map((quality) => (
                <Quality quality={quality} key={quality._id} />
            ))}
        </>
    );
}
QualityList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualityList;
