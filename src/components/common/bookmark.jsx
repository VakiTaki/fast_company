import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getAuthId, getUserById } from "../../store/usersSlice";

function Bookmark({ onToogleBookmark, user }) {
    const clsIcon = "bi fs-3 text-warning bi-star";
    const authId = useSelector(getAuthId());
    const currentUser = useSelector(getUserById(authId));
    const isBookmark = currentUser.bookmark
        ? currentUser.bookmark.some((u) => u === user._id)
        : false;
    return (
        <div onClick={() => onToogleBookmark(user._id)}>
            <i className={isBookmark ? clsIcon + "-fill" : clsIcon}></i>
        </div>
    );
}

Bookmark.propTypes = {
    onToogleBookmark: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default Bookmark;
