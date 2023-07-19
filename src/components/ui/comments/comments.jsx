import React from "react";
import NewCommentForm from "./newCommentForm";
import CommentsList from "./commentsList";
import { useComments } from "../../../hooks/useComments";

function Comments() {
    const { comments, createComment, removeComment } = useComments();
    const handleDeleteComment = (id) => {
        removeComment(id);
    };
    const handleAddComment = (data) => {
        createComment(data);
    };

    const sortedComentList = comments.sort(
        (a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)
    );
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <NewCommentForm onAddComment={handleAddComment} />
                </div>
            </div>

            {!!sortedComentList.length && (
                <div className="card mb-3">
                    <div className="card-body">
                        <CommentsList
                            commentsList={sortedComentList}
                            onDelete={handleDeleteComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Comments;
