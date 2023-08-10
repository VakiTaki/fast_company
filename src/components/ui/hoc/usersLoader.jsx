import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getIsDataLoaded, loadUserList } from "../../../store/usersSlice";
import localStorageServise from "../../../service/localStorage.service";
import LogOut from "../../../layouts/logOut";

function UsersLoader({ children }) {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getIsDataLoaded());
    const currentUserId = localStorageServise.getUserId();
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUserList());
        }
    }, []);
    if (!dataStatus) return "Загрузка User";
    return <>{currentUserId ? children : <LogOut />}</>;
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default UsersLoader;
