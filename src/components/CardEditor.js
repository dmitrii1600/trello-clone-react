import React, {Component, useState} from 'react';

import "../styles/CardEditor.css";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
/*
class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text || "",
        };
    }

    handleChangeText = event => this.setState({text: event.target.value});

    onEnter = e => {
        const {text} = this.state;

        if (e.keyCode === 13) {
            e.preventDefault();

            this.props.onSave(text);
        }
    };

    render() {
        const {text} = this.state;
        const {onSave, onCancel, onDelete, adding} = this.props;

        return (
            <div className="Edit-Card">
                <div className="Card">
                    <TextareaAutosize
                        autoFocus
                        className="Edit-Card-Textarea"
                        placeholder="Enter text..."
                        value={text}
                        onChange={this.handleChangeText}
                        onKeyDown={this.onEnter}
                    />
                </div>
                <EditButtons
                    handleSave={() => onSave(text)}
                    saveLabel={adding ? "Add card" : "Save"}
                    handleDelete={onDelete}
                    handleCancel={onCancel}
                />
            </div>
        );
    }
}*/


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
        <div className="Edit-Card">
            <div className="Card">
                <TextareaAutosize
                    autoFocus
                    className="Edit-Card-Textarea"
                    placeholder="Enter text..."
                    value={text}
                    onChange={handleChangeText}
                    onKeyDown={onEnter}
                />
            </div>
            <EditButtons
                handleSave={() => onSave(text)}
                saveLabel={adding ? "Add card" : "Save"}
                handleDelete={onDelete}
                handleCancel={onCancel}
            />
        </div>
    );
};

export default CardEditor;