import React from "react";
import PropTypes from "prop-types";

function TableHeader({ onSort, columns, selectedSort }) {
    const renderArrow = (path) =>
        path === selectedSort.iter ? (
            <i
                className={`bi bi-caret-${
                    selectedSort.order === "asc" ? "down" : "up"
                }-fill`}
            ></i>
        ) : null;
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => onSort(columns[column].path)
                                : null
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                        style={{ width: "110px" }}
                    >
                        <div className="d-flex  text-nowrap">
                            {columns[column].name}
                            {renderArrow(columns[column].path)}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    selectedSort: PropTypes.object
};

export default TableHeader;
