import React, { useState } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";

const UsersTable = ({ users, onDelete, onToogleBookMark }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);
    if (!userCrop.length && currentPage !== 1) {
        setCurrentPage((prev) => prev - 1);
    }
    return (
        <>
            {users.length !== 0 && (
                <div style={{ height: "350px" }}>
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
            )}
            {!!users.length && (
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </>
    );
};
UsersTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object.isRequired),
    onDelete: PropTypes.func.isRequired,
    onToogleBookMark: PropTypes.func.isRequired
};

export default UsersTable;
