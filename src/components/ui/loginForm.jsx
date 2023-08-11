import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useDispatch, useSelector } from "react-redux";
import {
    signIn,
    getUsersError,
    getIsLoggedIn,
    clearError
} from "../../store/usersSlice";
import history from "../../utils/histoty";
import _ from "lodash";

function LoginForm() {
    const initialState = {
        email: "",
        password: "",
        stayOn: false
    };
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsLoggedIn());
    useEffect(() => {
        if (isAuth) {
            history.replace("/users");
        }
        if (loginError) dispatch(clearError());
    }, []);
    const [data, setData] = useState(initialState);
    const loginError = useSelector(getUsersError());
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!_.isEqual(data, initialState)) {
            validate();
        } else {
            setErrors({});
        }
    }, [data]);
    const handleChange = (target) => {
        if (loginError) dispatch(clearError());
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать цифру"
            },
            minLength: {
                value: 8,
                message: `Пароль cодержать минимум 8 символов`
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return !Object.keys(errors).length;
    };
    const isValid =
        !Object.keys(errors).length && !_.isEqual(data, initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        const isValid = validate();
        if (!isValid) return;
        dispatch(signIn(data, redirect));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={"Почта"}
                name={"email"}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={"Пароль"}
                type={"password"}
                name={"password"}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
                label="Оставать в системе"
            />
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                className="btn btn-primary mx-auto w-100"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
}

export default LoginForm;
