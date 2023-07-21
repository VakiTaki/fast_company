import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

function Bookmark({ onToogleBookmark, user }) {
    const clsIcon = "bi fs-3 text-warning bi-star";
    const { currentUser } = useAuth();
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
