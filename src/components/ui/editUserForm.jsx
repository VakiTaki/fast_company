import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import PropTypes from "prop-types";
import api from "../../api";
import { useHistory } from "react-router-dom";

function EditUserForm({ user, qualities, professions }) {
    const history = useHistory();
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const [data, setData] = useState({
        email: user.email,
        name: user.name,
        profession: user.profession,
        sex: user.sex,
        qualities: user.qualities.map((quality) => ({
            label: quality.name,
            value: quality._id,
            color: quality.color
        })),
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
        const { profession, qualities } = data;
        api.users
            .update(user._id, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };
    const handleToUserPage = () => {
        history.push(`/users/${user._id}`);
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
                options={professions}
                value={data.profession}
                onChange={handleChange}
                defaultOption={"Выбрать..."}
                error={errors.profession}
                optionsName={"name"}
                optionsValue={"_id"}
                name="profession"
            />
            <RadioField
                label={"Выбери свой пол"}
                options={[
                    { name: "Мужской", value: "male" },
                    { name: "Женский", value: "female" },
                    { name: "Секрет", value: "secret" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                defaultValue={data.qualities}
                isMulti
                name="qualities"
                label="Твои качества"
                options={qualities}
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
