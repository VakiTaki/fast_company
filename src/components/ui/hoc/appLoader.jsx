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
    if (isLoading) return <Loader />;
    return children;
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AppLoader;
