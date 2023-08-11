import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { randomInt } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getQialities } from "../../store/qualitiesSlice";
import { getProfessions } from "../../store/professionsSlice";
import {
    signUp,
    getUsersError,
    getIsLoggedIn,
    clearError
} from "../../store/usersSlice";
import history from "../../utils/histoty";
import _ from "lodash";

function RegisterForm() {
    const initialState = {
        name: "",
        email: "",
        password: "",
        profession: "",
        qualities: [],
        licence: false
    };
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsLoggedIn());
    useEffect(() => {
        if (isAuth) {
            history.replace("/users");
        }
        if (registerError) dispatch(clearError());
    }, []);
    const profession = useSelector(getProfessions());
    const qualities = useSelector(getQialities());
    const [data, setData] = useState(initialState);
    const registerError = useSelector(getUsersError());
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!_.isEqual(data, initialState)) {
            validate();
        } else {
            setErrors({});
        }
    }, [data]);
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
        if (registerError) dispatch(clearError());
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            isName: {
                message: "Имя должно быть формата 'Имя Фамилия (Отчество)'"
            }
        },
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
        },
        profession: {
            isRequired: {
                message: "Поле обязательно для заполнения"
            }
        },
        licence: {
            isRequired: {
                message: "Поле обязательно для заполнения"
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
    const professionToOptions = () => {
        return profession.map((prof) => {
            return { label: prof.name, value: prof._id };
        });
    };
    const qualitiesToOption = () => {
        return qualities.map((qual) => {
            return { label: qual.name, value: qual._id };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities?.map((q) => q.value),
            bookmark: [],
            completedMeetings: randomInt(0, 200)
        };
        dispatch(signUp(newData));
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
                label={"Имя"}
                name={"name"}
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label={"Пароль"}
                type={"password"}
                name={"password"}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label={"Выбери профессию"}
                options={professionToOptions(profession)}
                value={data.profession}
                onChange={handleChange}
                defaultOption={"Выбрать..."}
                error={errors.profession}
                optionsName={"name"}
                optionsValue={"_id"}
                name="profession"
            />
            <MultiSelectField
                isMulti
                name="qualities"
                label="Твои качества"
                options={qualitiesToOption(qualities)}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                optionsName="name"
                optionsValue="_id"
            />
            <CheckBoxField
                error={errors.licence}
                value={data.licence}
                onChange={handleChange}
                name="licence"
                // label="Согласен с лицензионным соглашением"
            >
                Согласен с лицензионным соглашением
            </CheckBoxField>
            {registerError && <p className="text-danger">{registerError}</p>}
            <button
                className="btn btn-primary mx-auto w-100"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
}

export default RegisterForm;
