import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualityList from "./qualityList";
import Table from "./table";
import DeleteBtn from "./deleteBtn";

function UsersTable({
    userCrop,
    onDelete,
    onToogleBookmark,
    onSort,
    selectedSort
}) {
    const columns = {
        name: { path: "name", name: "Имя" },
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
        <Table onSort={onSort} columns={columns} data={userCrop}>
            <TableHeader
                onSort={onSort}
                columns={columns}
                selectedSort={selectedSort}
            />
            <TableBody columns={columns} data={userCrop} />
        </Table>
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
