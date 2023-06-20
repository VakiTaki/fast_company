import React from "react";
import PropTypes, { array, func } from "prop-types";
import { dataFormat } from "../../../utils/dataFormat";

function Comment({ comment, usersList, onDelete }) {
    const msgAuthor = usersList.find((user) => user.value === comment.userId);
    return (
        <div className="d-flex flex-start">
            <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`}
                className="rounded-circle shadow-1-strong me-3"
                alt="avatar"
                width="65"
                height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {msgAuthor
                                ? msgAuthor.label
                                : "Пользователь удален"}
                            <span className="small ms-2">
                                {dataFormat(comment.created_at)}
                            </span>
                        </p>
                        <button
                            className="btn btn-sm text-primary d-flex align-items-center"
                            onClick={() => onDelete(comment._id)}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
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
