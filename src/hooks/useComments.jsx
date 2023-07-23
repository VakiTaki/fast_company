import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import commentsService from "../service/comment.service";

const CommentContext = React.createContext();

export const useComments = () => {
    return useContext(CommentContext);
};
const CommentsProvider = ({ children }) => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: id,
            created_at: Date.now(),
            userId: currentUser._id
        };
        try {
            const { content } = await commentsService.createComment(comment);
            setIsLoading(false);
            setComments((prev) => [...prev, content]);
            return content;
        } catch (error) {
            console.log("error");
            errorCatcher(error);
        }
    }
    async function getComments() {
        try {
            const { content } = await commentsService.getComments(id);
            setComments(content);
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function removeComment(id) {
        try {
            const { content } = await commentsService.removeComment(id);
            if (content === null) {
                setComments((prev) => prev.filter((com) => com._id !== id));
            }
            return content;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message || "No message error");
    }
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        getComments();
    }, [id]);
    return (
        <CommentContext.Provider
            value={{ comments, createComment, isLoading, removeComment }}
        >
            {children}
        </CommentContext.Provider>
    );
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ])
};

export default CommentsProvider;
