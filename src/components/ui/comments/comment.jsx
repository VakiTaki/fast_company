import React from "react";
import PropTypes, { array, func } from "prop-types";
import { dataFormat } from "../../../utils/dataFormat";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

function Comment({ comment, onDelete }) {
    const { currentUser } = useAuth();
    const { getUserById } = useUser();
    const user = getUserById(comment.userId);
    return (
        <div className="d-flex flex-start">
            <img
                src={user.image}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {user.name}
                            <span className="small ms-2">
                                {dataFormat(comment.created_at)}
                            </span>
                        </p>
                        {user._id === currentUser._id && (
                            <button
                                className="btn btn-sm text-primary d-flex align-items-center"
                                onClick={() => onDelete(comment._id)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        )}
                    </div>
                    <p className="small mb-0">{comment.content}</p>
                </div>
            </div>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object,
    usersList: array,
    onDelete: func
};

export default Comment;
