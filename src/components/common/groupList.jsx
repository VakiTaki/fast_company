import React from "react";
import PropTypes, { string } from "prop-types";

function GroupList({ items, onItemSelect, selectedProf, profListinUsers }) {
    const itemList = Object.values(items)
        .sort(function (a, b) {
            return parseInt(a._id) - parseInt(b._id);
        })
        .filter((item) => profListinUsers.includes(item._id));
    return (
        <ul className="list-group me-2 mt-2">
            {itemList.map((item) => (
                <li
                    className={
                        "list-group-item text-nowrap" +
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
    selectedProf: PropTypes.object.isRequired,
    profListinUsers: PropTypes.arrayOf(string)
};

export default GroupList;
