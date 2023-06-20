import React from "react";
import QualityList from "../qualities/qualityList";
import PropTypes from "prop-types";

function QualitiesCard({ qualities }) {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Качества</span>
                </h5>
                <p className="card-text">
                    <QualityList qualities={qualities} />
                </p>
            </div>
        </div>
    );
}

QualitiesCard.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesCard;
