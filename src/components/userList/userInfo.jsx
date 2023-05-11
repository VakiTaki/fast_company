import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../api";
import QualityList from "../tableElements/qualityList";
import Loader from "../tableElements/loader";

function UserInfo({ id }) {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const history = useHistory();
    const handleToUserList = () => {
        history.replace("/users");
    };
    return (
        <>
            {user ? (
                <div>
                    <h3>{user.name}</h3>
                    <h6>Профессия: {user.profession.name}</h6>
                    <QualityList qualities={user.qualities} />
                    <p className="mt-3">
                        Kоличество встреч: {user.completedMeetings}
                    </p>
                    <p>Рейтинг: {user.rate}/5</p>
                </div>
            ) : (
                <Loader />
            )}
            <button onClick={handleToUserList} className="btn btn-primary mt-2">
                К списку пользователей
            </button>
        </>
    );
}

UserInfo.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserInfo;
