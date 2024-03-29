import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Loader from "../../common/loader";
import UserCard from "../../ui/userInfo/userCard";
import QualitiesCard from "../../ui/userInfo/qualitiesCard";
import MeetingsCard from "../../ui/userInfo/meetingsCard";
import Comments from "../../ui/comments/comments";
import { useUser } from "../../../hooks/useUsers";
import CommentsProvider from "../../../hooks/useComments";

function userInfoPage({ id }) {
    const userRef = useRef();
    const history = useHistory();
    const handleToUsers = () => {
        history.replace(`/users`);
    };
    const { getUserById } = useUser();
    const user = getUserById(id);
    const [hasUser, setHasUser] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            if (!userRef.current) {
                setHasUser((prev) => !prev);
                setTimeout(() => {
                    handleToUsers();
                }, 2000);
            }
        }, 5000);
    }, []);
    useEffect(() => {
        userRef.current = user;
    }, [user]);
    return (
        <>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard meetings={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <CommentsProvider>
                                <Comments />
                            </CommentsProvider>
                        </div>
                    </div>
                </div>
            ) : hasUser ? (
                <h3 className="text-center text-danger">
                    Пользователь не найден!
                </h3>
            ) : (
                <>
                    <Loader />
                </>
            )}
        </>
    );
}

userInfoPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default userInfoPage;
