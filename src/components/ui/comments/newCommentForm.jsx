import React, { useState, useEffect } from "react";
import SelectField from "../../common/form/selectField";
import TextAreaField from "../../common/form/textareaField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import { PropTypes } from "prop-types";

function NewCommentForm({ id, onAddComment, usersList }) {
    const [data, setData] = useState({
        userId: "",
        content: "",
        pageId: id
    });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        },
        userId: {
            isRequired: {
                message: "Надо выбрать пользователя"
            }
        }
    };
    const [isDirty, setIsDirty] = useState(false);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return !Object.keys(errors).length;
    };
    const isValid = isDirty ? !Object.keys(errors).length : false;
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        api.comments.add(data).then((data) => {
            setData({
                userId: "",
                content: "",
                pageId: id
            });
            onAddComment();
            setIsDirty(false);
        });
    };
    useEffect(() => {
        if (isDirty) {
            validate();
        }
    }, [data, isDirty]);
    return (
        <form onSubmit={handleSubmit} onFocus={() => setIsDirty(true)}>
            <h2>Новый комментарий</h2>
            <div className="mb-4">
                <SelectField
                    label={"Пользователь"}
                    options={usersList}
                    value={data.userId}
                    onChange={handleChange}
                    defaultOption={"Выбрать..."}
                    error={errors.userId}
                    name={"userId"}
                />
            </div>
            <div className="mb-4">
                <TextAreaField
                    className="form-control"
                    id="content"
                    name="content"
                    rows="3"
                    value={data.content}
                    onChange={handleChange}
                    error={errors.content}
                    label={"Сообщение"}
                ></TextAreaField>
            </div>
            <button className="btn btn-primary" disabled={!isValid}>
                Добавить комментарий
            </button>
        </form>
    );
}

NewCommentForm.propTypes = {
    id: PropTypes.string,
    onAddComment: PropTypes.func,
    usersList: PropTypes.array
};

export default NewCommentForm;
