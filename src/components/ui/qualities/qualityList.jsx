import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

function QualityList({ qualities }) {
    return (
        <>
            {qualities &&
                qualities.map((qualityId) => (
                    <Quality id={qualityId} key={qualityId} />
                ))}
        </>
    );
}
QualityList.propTypes = {
    qualities: PropTypes.array
};

export default QualityList;
