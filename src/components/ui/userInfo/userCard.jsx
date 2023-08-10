import React from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import localStorageServise from "../../../service/localStorage.service";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/usersSlice";

function UserCard({ user }) {
    const currentUser = useSelector(
        getUserById(localStorageServise.getUserId())
    );
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
                                    <i
                                        className="bi bi-caret-down-fill text-primary"
                                        role="button"
                                    ></i>
                                    <i
                                        className="bi bi-caret-up text-secondary"
                                        role="button"
                                    ></i>
                                </>
                            )}
                            <span className="ms-2">Pейтинг: {user.rate}</span>
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
