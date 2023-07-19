import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useProfession } from "../../hooks/useProfession";
import { useQuality } from "../../hooks/useQuality";
import { useAuth } from "../../hooks/useAuth";
import { randomInt } from "../../utils";

function RegisterForm() {
    const history = useHistory();
    const { signUp } = useAuth();
    const { profession } = useProfession();
    const { quality } = useQuality();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        qualities: [],
        licence: false
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
    const isValid = !Object.keys(errors).length;
    const professionToOptions = () => {
        return profession.map((prof) => {
            return { label: prof.name, value: prof._id };
        });
    };
    const qualitiesToOption = () => {
        return quality.map((qual) => {
            return { label: qual.name, value: qual._id };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value),
            bookmark: false,
            completedMeetings: randomInt(0, 200),
            rate: randomInt(1, 5)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
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
                options={qualitiesToOption(quality)}
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
