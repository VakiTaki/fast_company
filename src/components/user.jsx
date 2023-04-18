import React from "react";
import Quality from "./qualities";
import Bookmark from "./bookmark";

const User = ({ user, onDelete, onToogleBookMark }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((quality) => (
                    <Quality quality={quality} key={quality._id} />
                ))}
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

export default User;
