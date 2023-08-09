import React from "react";
import NewCommentForm from "./newCommentForm";
import CommentsList from "./commentsList";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    removeComment
} from "../../../store/commentsSlice";

function Comments() {
    const dispatch = useDispatch();
    const comments = useSelector(getComments());
    const handleDeleteComment = (id) => {
        dispatch(removeComment(id));
    };
    const handleAddComment = (data) => {
        dispatch(createComment(data));
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <NewCommentForm onAddComment={handleAddComment} />
                </div>
            </div>

            {!!comments.length && (
                <div className="card mb-3">
                    <div className="card-body">
                        <CommentsList
                            commentsList={comments}
                            onDelete={handleDeleteComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Comments;
