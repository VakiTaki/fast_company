import React from "react";
import PropTypes from "prop-types";

function CheckBoxField({ name, onChange, label, value, error }) {
    const isInvalidClass = () => {
        return "form-check-input " + (error ? "is-invalid" : "");
    };
    const handleChange = () => {
        onChange({ name, value: !value });
    };
    return (
        <div className="form-check mb-2">
            <input
                className={isInvalidClass()}
                type="checkbox"
                value={value}
                id={name}
                checked={value}
                onChange={handleChange}
            />
            <label className="form-check-label" htmlFor={name}>
                {label}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

CheckBoxField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    value: PropTypes.bool,
    error: PropTypes.string
};

export default CheckBoxField;
