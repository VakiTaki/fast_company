import React, { useState, useEffect } from "react";
import TextAreaField from "../../common/form/textareaField";
import { validator } from "../../../utils/validator";
import { PropTypes } from "prop-types";

const initialData = {
    content: ""
};

function NewCommentForm({ onAddComment }) {
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
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
        onAddComment(data);
        clearForm();
        // getComments.comments.add({ ...data, pageId: id }).then(() => {
        //     setData(initialData);
        //     setErrors({});
        //     onAddComment();
        //     setIsDirty(false);
        // });
    };
    const clearForm = () => {
        setData(initialData);
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
                <TextAreaField
                    className="form-control"
                    id="content"
                    name="content"
                    rows="3"
                    value={data.content || ""}
                    onChange={handleChange}
                    error={errors.content}
                    label={"Сообщение"}
                ></TextAreaField>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!isValid}
            >
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
