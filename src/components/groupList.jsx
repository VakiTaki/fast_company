import React from "react";
import PropTypes from "prop-types";

function GroupList({
    items,
    onItemSelect,
    valueProp,
    contentProp,
    selectedProf
}) {
    return (
        <ul className="list-group me-2 mt-2">
            {Object.keys(items).map((item) => (
                <li
                    className={
                        "list-group-item" +
                        (items[item]._id === selectedProf._id ? " active" : "")
                    }
                    key={items[item][valueProp]}
                    onClick={() => onItemSelect(items[item])}
                    role="button"
                >
                    {items[item][contentProp]}
                </li>
            ))}
        </ul>
    );
}
GroupList.defaultProps = {
    valueProp: "_id",
    contentProp: "name"
};
GroupList.propTypes = {
    items: PropTypes.object,
    onItemSelect: PropTypes.func.isRequired,
    valueProp: PropTypes.string.isRequired,
    contentProp: PropTypes.string.isRequired,
    selectedProf: PropTypes.object
};

export default GroupList;
