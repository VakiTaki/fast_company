import React, { useState } from "react";
import PropTypes from "prop-types";

function TextField({ label, type, name, value, onChange, error, placeholder }) {
    const [showPassword, setShowPassford] = useState(false);
    const tooglePassword = () => {
        setShowPassford((prev) => !prev);
    };
    const isShowPassword = () => {
        return showPassword ? "text" : "password";
    };
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
                <input
                    type={type === "password" ? isShowPassword() : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={isInvalidClass()}
                    placeholder={placeholder || ""}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        onClick={tooglePassword}
                        type="button"
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
}
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextField;
