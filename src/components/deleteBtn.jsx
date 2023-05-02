import React from "react";
import PropTypes from "prop-types";

function DeleteBtn({ onDelete, user }) {
    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(user._id)}
        >
            Delete
        </button>
    );
}
DeleteBtn.propTypes = {
    onDelete: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default DeleteBtn;
