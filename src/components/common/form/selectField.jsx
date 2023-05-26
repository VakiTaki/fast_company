import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    optionsName,
    optionsValue,
    error,
    name
}) => {
    const isInvalidClass = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handleChange = (e) => {
        onChange({ name, value: e.target.value });
    };
    return (
        <div className="mb-2">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                className={isInvalidClass()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    optionsName: PropTypes.string,
    optionsValue: PropTypes.string
};

export default SelectField;
