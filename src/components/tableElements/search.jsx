import React from "react";
import TextField from "../UI/textField";
import PropTypes from "prop-types";

function Search({ onChange, value }) {
    return (
        <TextField
            type={"search"}
            placeholder={"Поиск по имени"}
            onChange={onChange}
            value={value}
        />
    );
}

Search.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};
export default Search;
