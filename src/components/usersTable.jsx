import React from "react";
import User from "./user";

function usersTable({ userCrop, onDelete, onToogleBookMark }) {
    return (
        <div
        // style={{
        //     height: `${(pageSize + 1) * 90}px`
        // }}
        >
            <table className="table m-2 align-middle">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "110px" }}>
                            Имя
                        </th>
                        <th scope="col" style={{ width: "250px" }}>
                            Качества
                        </th>
                        <th scope="col">Профессия</th>
                        <th scope="col" style={{ width: "150px" }}>
                            Встретился, раз
                        </th>
                        <th scope="col">Оценка</th>
                        <th scope="col" className="text-center">
                            Избранное
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {userCrop.map((user) => (
                        <User
                            user={user}
                            key={user._id}
                            onDelete={onDelete}
                            onToogleBookMark={onToogleBookMark}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default usersTable;
