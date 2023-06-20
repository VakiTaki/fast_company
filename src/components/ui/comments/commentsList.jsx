import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

function CommentsList({ commentsList, onDelete, usersList }) {
    return (
        <div className="card-body">
            <h2>Комментарии</h2>
            <hr />
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        {commentsList
                            .sort(
                                (a, b) =>
                                    parseFloat(b.created_at) -
                                    parseFloat(a.created_at)
                            )
                            .map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onDelete={onDelete}
                                    usersList={usersList}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

CommentsList.propTypes = {
    commentsList: PropTypes.array,
    onDelete: PropTypes.func,
    usersList: PropTypes.array
};
export default CommentsList;