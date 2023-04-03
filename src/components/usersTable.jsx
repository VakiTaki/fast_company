import React, { useState } from "react";
import api from "../../src/api/index";
import User from "./user";
import PartyMsg from "./partyMsg";

const UsersTable = (props) => {
  const [users, setUsers] = useState(api.users.fetchAll());

  function handlerDelite(id) {
    setUsers((prev) => prev.filter((user) => user._id !== id));
  }

  return (
    <div className="container">
      <PartyMsg numUsers={users.length} />
      {users.length !== 0 && (
        <table className="table m-2">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User user={user} key={user._id} onDelite={handlerDelite} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
