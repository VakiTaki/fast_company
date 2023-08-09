import React, { useState } from "react";
import TextAreaField from "../../common/form/textareaField";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";

const initialData = {
    content: ""
};

function NewCommentForm({ onAddComment }) {
    const { id: pageId } = useParams();
    const [data, setData] = useState(initialData);
    const handleChange = (target) => {
        setData((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment({ ...data, pageId });
        clearForm();
    };
    const clearForm = () => {
        setData(initialData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Новый комментарий</h2>
            <div className="mb-4">
                <TextAreaField
                    className="form-control"
                    id="content"
                    name="content"
                    rows="3"
                    value={data.content || ""}
                    onChange={handleChange}
                    label={"Сообщение"}
                ></TextAreaField>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                disabled={!data.content.length > 0}
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
