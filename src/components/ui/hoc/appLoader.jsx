import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    getIsLoading,
    getIsLoggedIn,
    loadUserList
} from "../../../store/usersSlice";
import { loadQualitiesList } from "../../../store/qualitiesSlice";
import { loadProfessionsList } from "../../../store/professionsSlice";
import Loader from "../../common/loader";

function AppLoader({ children }) {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading());
    const isAuth = useSelector(getIsLoggedIn());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (isAuth) {
            dispatch(loadUserList());
        }
    }, []);
    return (
        <div className="position-relative">
            <div className="z-1"></div>
            {children}
            {isLoading && (
                <div className="z-2 fixed-top w-100 h-100 bg-black bg-opacity-25">
                    <Loader />
                </div>
            )}
        </div>
    );
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AppLoader;
