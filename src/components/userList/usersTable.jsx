import React from "react";
import PropTypes from "prop-types";
import TableHeader from "../table/tableHeader";
import TableBody from "../table/tableBody";
import Bookmark from "../tableElements/bookmark";
import QualityList from "../tableElements/qualityList";
import Table from "../table/table";
import DeleteBtn from "../tableElements/deleteBtn";
import { Link } from "react-router-dom";

function UsersTable({
    userCrop,
    onDelete,
    onToogleBookmark,
    onSort,
    selectedSort
}) {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link className="nav-link" to={`/users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualityList qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark user={user} onToogleBookmark={onToogleBookmark} />
            )
        },
        delete: {
            component: (user) => <DeleteBtn onDelete={onDelete} user={user} />
        }
    };

    return (
        <>
            <Table onSort={onSort} columns={columns} data={userCrop}>
                <TableHeader
                    onSort={onSort}
                    columns={columns}
                    selectedSort={selectedSort}
                />
                <TableBody columns={columns} data={userCrop} />
            </Table>
        </>
    );
}
UsersTable.propTypes = {
    userCrop: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UsersTable;
