import React from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import localStorageServise from "../../../service/localStorage.service";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/usersSlice";
import RatesEdit from "../ratesEdit";
import { getRateForId } from "../../../store/ratesSlice";

function UserCard({ user }) {
    const currentUser = useSelector(
        getUserById(localStorageServise.getUserId())
    );
    const rate = useSelector(getRateForId(user._id)) || "Нет оценок";
    const history = useHistory();
    const handleToUserEditPage = () => {
        history.push(history.location.pathname + `/edit`);
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className=" position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleToUserEditPage}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}
                <div
                    className="d-flex flex-column align-items-center text-center position-relative
    "
                >
                    <img
                        src={user.image}
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            {currentUser._id !== user._id && (
                                <>
                                    <p className="mb-0">Моя оценка</p>
                                    <RatesEdit />
                                </>
                            )}
                            <span className="ms-2 mt-2">Pейтинг: {rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
