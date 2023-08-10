import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    loadCommentsList,
    getIsDataLoaded
} from "../../../store/commentsSlice";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../../common/loader";

function CommentsLoader({ children }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dataStatus = useSelector(getIsDataLoaded());
    useEffect(() => {
        dispatch(loadCommentsList(id));
    }, [id]);
    if (!dataStatus) return <Loader />;
    return children;
}

CommentsLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default CommentsLoader;
