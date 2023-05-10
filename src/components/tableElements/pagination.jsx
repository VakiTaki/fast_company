import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = ({ itemsCount, pageSize, onPageChange, currentPage }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pageCount + 1);

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li
                    className={
                        "page-item " + (currentPage === 1 ? "disabled" : "")
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <i className="bi bi-caret-left-fill"></i>
                    </button>
                </li>
                {pages.map((page) => (
                    <li
                        className={
                            "page-item " +
                            (currentPage === page ? "active" : "")
                        }
                        key={"page_" + page}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
                <li
                    className={
                        "page-item " +
                        (currentPage === pages.length ? "disabled" : "")
                    }
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <i className="bi bi-caret-right-fill"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
