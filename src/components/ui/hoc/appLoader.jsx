import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    isDataLoaded,
    isLoggedIn,
    loadUserList
} from "../../../store/usersSlice";
import { loadQualitiesList } from "../../../store/qualitiesSlice";
import { loadProfessionsList } from "../../../store/professionsSlice";

function AppLoader({ children }) {
    const dispatch = useDispatch();
    const dataStatus = useSelector(isDataLoaded());
    const isAuth = useSelector(isLoggedIn());
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
        if (!dataStatus && isAuth) {
            dispatch(loadUserList());
        }
    }, []);
    return children;
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default AppLoader;
