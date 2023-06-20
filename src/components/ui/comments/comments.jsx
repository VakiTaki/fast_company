import React, { useState, useRef, useEffect } from "react";
import api from "../../../api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import NewCommentForm from "./newCommentForm";
import CommentsList from "./commentsList";

function Comments() {
    const { id } = useParams();
    const userRef = useRef();
    const [commentsList, setCommenstList] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [user, setUser] = useState();
    const handleDeleteComment = (id) => {
        api.comments
            .remove(id)
            .then((data) =>
                setCommenstList(
                    commentsList.filter((comment) => comment._id !== data)
                )
            );
    };
    const handleAddComment = () => {
        api.comments
            .fetchCommentsForUser(id)
            .then((data) => setCommenstList(data));
    };
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
        api.users.fetchAll().then((data) => {
            const userList = Object.keys(data).map((user) => ({
                label: data[user].name,
                value: data[user]._id
            }));
            setUsersList(userList);
        });
        api.comments
            .fetchCommentsForUser(id)
            .then((data) => setCommenstList(data));
    }, []);
    useEffect(() => {
        userRef.current = user;
    }, [user]);
    const sortedComentList = commentsList.sort(
        (a, b) => parseFloat(b.created_at) - parseFloat(a.created_at)
    );
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <NewCommentForm
                        id={id}
                        onAddComment={handleAddComment}
                        usersList={usersList}
                    />
                </div>
            </div>

            {!!commentsList.length && !!usersList.length && (
                <div className="card mb-3">
                    <div className="card-body">
                        <CommentsList
                            commentsList={sortedComentList}
                            onDelete={handleDeleteComment}
                            usersList={usersList}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Comments;
