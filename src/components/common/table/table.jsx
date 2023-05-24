import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

function Table({ onSort, columns, data, children }) {
    return (
        <table className="table align-middle ">
            {children || (
                <>
                    <TableHeader onSort={onSort} columns={columns} />
                    <TableBody columns={columns} data={data} />
                </>
            )}
        </table>
    );
}

Table.propTypes = {
    onSort: PropTypes.func,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
