import React from "react";
import PropTypes from "prop-types";

function GroupList({ items, onItemSelect, selectedProf }) {
    let itemList = [];
    typeof items === "object" ? (itemList = Object.values(items)) : items;
    itemList.sort(function (a, b) {
        return parseFloat(a._id) - parseFloat(b._id);
    });

    return (
        <ul className="list-group me-2 mt-2">
            {itemList.map((item) => (
                <li
                    className={
                        "list-group-item" +
                        (item._id === selectedProf._id ? " active" : "")
                    }
                    key={item._id}
                    onClick={() => onItemSelect(item)}
                    role="button"
                >
                    {item.name}
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
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func.isRequired,
    valueProp: PropTypes.string,
    contentProp: PropTypes.string,
    selectedProf: PropTypes.object.isRequired
};

export default GroupList;
