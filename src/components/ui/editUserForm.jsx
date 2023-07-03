import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useQuality } from "../../hooks/useQuality";

function EditUserForm({ user, qualities, professions }) {
    const history = useHistory();
    const { getQualityById } = useQuality();
    const [data, setData] = useState({
        email: user.email,
        name: user.name,
        profession: user.profession,
        qualities: user.qualities.map((qual) => {
            const q = getQualityById(qual);
            return { label: q.name, value: q._id, color: q.color };
        }),
        isValidData: false
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Поле обязательно дял заполнения"
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
        isValidData: {
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
    const isValid = !Object.keys(errors).length;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log({
            ...data,
            qualities: data.qualities.map((q) => {
                return q.value;
            })
        });
    };
    const handleToUserPage = () => {
        history.push(`/users/${user._id}`);
    };
    const professionToOptions = () => {
        return professions.map((prof) => {
            return { label: prof.name, value: prof._id };
        });
    };
    const qualitiesToOption = () => {
        return qualities.map((qual) => {
            return { label: qual.name, value: qual._id };
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={"Имя"}
                name={"name"}
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label={"Почта"}
                name={"email"}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <SelectField
                label={"Выбери профессию"}
                options={professionToOptions(professions)}
                value={data.profession}
                onChange={handleChange}
                defaultOption={"Выбрать..."}
                error={errors.profession}
                optionsName={"name"}
                optionsValue={"_id"}
                name="profession"
            />
            <MultiSelectField
                defaultValue={data.qualities}
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
                error={errors.isValidData}
                value={data.isValidData}
                onChange={handleChange}
                name="isValidData"
                // label="Согласен с лицензионным соглашением"
            >
                Введены точные данные
            </CheckBoxField>
            <button
                className="btn btn-primary mx-auto w-100"
                disabled={!isValid}
            >
                Submit
            </button>
            <button
                type="button"
                className="btn btn-secondary mx-auto mt-2 w-100"
                onClick={handleToUserPage}
            >
                Отмена
            </button>
        </form>
    );
}
EditUserForm.propTypes = {
    user: PropTypes.object,
    qualities: PropTypes.array,
    professions: PropTypes.array
};

export default EditUserForm;
