import React from "react";
import PropTypes from "prop-types";

function TextAreaField({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    rows
}) {
    const isInvalidClass = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };
    const handleChange = (e) => {
        onChange({ name, value: e.target.value });
    };
    return (
        <div className="mb-2">
            {name && label && <label htmlFor={name}>{label}</label>}
            <div className=" input-group has-validation">
                <textarea
                    rows={rows}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={isInvalidClass()}
                    placeholder={placeholder || ""}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
}
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    rows: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextAreaField;
