import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import QualityList from "../../ui/qualities/qualityList";
import Loader from "../../common/loader";

function userInfoPage({ id }) {
    const userRef = useRef();
    const history = useHistory();
    const handleToUserEditPage = () => {
        history.replace(`/users/${id}/edit`);
    };
    const handleToUsers = () => {
        history.replace(`/users`);
    };
    const [user, setUser] = useState();
    const [hasUser, sethasUser] = useState(false);
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
        setTimeout(() => {
            if (!userRef.current) {
                sethasUser((prev) => !prev);
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
                <>
                    <div>
                        <h3>{user.name}</h3>
                        <h6>Профессия: {user.profession.name}</h6>
                        <QualityList qualities={user.qualities} />
                        <p className="mt-3">
                            Kоличество встреч: {user.completedMeetings}
                        </p>
                        <p>Рейтинг: {user.rate}/5</p>
                    </div>
                    <button
                        onClick={handleToUserEditPage}
                        className="btn btn-primary mt-2"
                    >
                        Редактировать
                    </button>
                    <button
                        onClick={handleToUsers}
                        className="btn btn-primary mt-2 ms-2"
                    >
                        К списку пользователей
                    </button>
                </>
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
