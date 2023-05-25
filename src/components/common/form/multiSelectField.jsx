import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

function MultiSelectField({
    name,
    options,
    onChange,
    optionsName,
    optionsValue,
    label
}) {
    const optionsArray =
        typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  label: options[optionName][optionsName],
                  value: options[optionName][optionsValue]
              }))
            : options.map((option) => ({
                  label: option[optionsName],
                  value: option[optionsValue]
              }));
    const handleChange = (value) => {
        onChange({ name, value });
    };
    return (
        <div className="mb-2">
            <label className="form-label">{label}</label>
            <Select
                closeMenuOnSelect={false}
                isMulti
                name={name}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </div>
    );
}

MultiSelectField.propTypes = {
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    optionsName: PropTypes.string,
    optionsValue: PropTypes.string,
    label: PropTypes.string
};

export default MultiSelectField;
