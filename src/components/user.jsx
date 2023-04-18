import React from "react";
import Quality from "./qualities";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, onToogleBookMark }) => {
    return (
        <tr style={{ height: "70px" }}>
            <td>{user.name}</td>
            <td>
                <div className="container ">
                    {user.qualities.map((quality) => (
                        <Quality quality={quality} key={quality._id} />
                    ))}
                </div>
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td className="text-center">
                <Bookmark user={user} onToogleBookMark={onToogleBookMark} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogleBookMark: PropTypes.func.isRequired
};

export default User;
