import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
    getIsDataLoaded,
    getIsLoading,
    loadUserList
} from "../../../store/usersSlice";
import localStorageServise from "../../../service/localStorage.service";
import LogOut from "../../../layouts/logOut";
import { addRateList } from "../../../store/ratesSlice";

function UsersLoader({ children }) {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getIsDataLoaded());
    const isLoading = useSelector(getIsLoading());
    const currentUserId = localStorageServise.getUserId();
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUserList());
        }
    }, []);
    if (!dataStatus && isLoading) return "Загрузка User";
    dispatch(addRateList());

    return <>{currentUserId ? children : <LogOut />}</>;
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default UsersLoader;
