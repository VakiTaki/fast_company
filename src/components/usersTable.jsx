import React from "react";
import User from "./user";

const UsersTable = (props) => {
  return (
    <>
      {props.users.length !== 0 && (
        <table className="table m-2 align-middle">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col" className="text-center">
                Избранное
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => (
              <User
                user={user}
                key={user._id}
                onDelete={props.onDelete}
                onToogleBookMark={props.onToogleBookMark}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersTable;
