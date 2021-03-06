import React, {useState} from 'react';

import "../styles/CardEditor.css";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = (props) => {

    const [text, setText] = useState(props.text || "");

    const handleChangeText = e => setText(e.target.value);

    const onEnter = e => {

        if (e.keyCode === 13) {
            e.preventDefault();
            props.onSave(text);
        }
    };

    const {onSave, onCancel, onDelete, adding} = props;

    return (
        <div className="Edit_Card">
            <div className="Card">
                <TextareaAutosize
                    autoFocus
                    className="Edit_Card_Textarea"
                    placeholder="Text..."
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
};

export default CardEditor;