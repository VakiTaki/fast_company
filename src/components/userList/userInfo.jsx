import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import api from "../../api";
import QualityList from "../tableElements/qualityList";

function UserInfo({ id }) {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    console.log(user);
    const history = useHistory();
    const handleToUserList = () => {
        history.replace("/users");
    };
    return (
        <>
            {user && (
                <>
                    <h3>{user.name}</h3>
                    <h4>Профессия: {user.profession.name}</h4>
                    <QualityList qualities={user.qualities} />
                    <p>количество встреч: {user.completedMeetings}</p>
                    <p>Рейтинг: {user.rate}/5</p>
                </>
            )}
            <button onClick={handleToUserList} className="btn btn-warning">
                К списку пользователей
            </button>
        </>
    );
}

UserInfo.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserInfo;
