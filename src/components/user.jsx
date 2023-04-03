import React from "react";
import Quality from "./qualities";

const User = ({ user, onDelite }) => {
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
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelite(user._id)}
        >
          Delite
        </button>
      </td>
    </tr>
  );
};

export default User;
