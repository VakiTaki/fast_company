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
        typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName][optionsName],
                  value: options[optionName][optionsValue]
              }))
            : options.map((option) => ({
                  name: option[optionsName],
                  value: option[optionsValue]
              }));
    const handleChange = (e) => {
        onChange({ name, value: e.target.value });
    };
    return (
        <div className="mb-2">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <select
                className={isInvalidClass()}
                id="validationCustom04"
                name={name}
                value={value}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
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
