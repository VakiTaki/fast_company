import React, { useEffect } from "react";
import Quality from "./quality";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "../../../store/qualities";

function QualityList({ qualities }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
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
