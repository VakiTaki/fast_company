import React from "react";
import PropTypes from "prop-types";

function Bookmark({ onToogleBookMark, user }) {
    const clsIcon = "bi fs-3 text-warning bi-star";
    return (
        <div onClick={() => onToogleBookMark(user._id)}>
            <i className={user.bookmark ? clsIcon + "-fill" : clsIcon}></i>
        </div>
    );
}

Bookmark.propTypes = {
    onToogleBookMark: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default Bookmark;
