import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { isDataLoaded, loadUserList } from "../../../store/usersSlice";

function UsersLoader({ children }) {
    const dispatch = useDispatch();
    const dataStatus = useSelector(isDataLoaded());
    useEffect(() => {
        if (!dataStatus) {
            dispatch(loadUserList());
        }
    }, []);
    if (!dataStatus) return "Загрузка User";
    return children;
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default UsersLoader;
