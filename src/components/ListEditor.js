import "../styles/ListEditor.css";

import React, {Component, useEffect, useRef} from "react";
import TextareaAutosize from "react-textarea-autosize";
/*
class ListEditor extends Component {
    ref = React.createRef();

    onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.props.saveList();
        }
    };

    handleClick = e => {
        const node = this.ref.current;

        if (node.contains(e.target)) {
            return;
        }

        this.props.onClickOutside();
    };

    componentDidMount() {
        document.addEventListener("click", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.handleClick, false);
    }

    render() {
        const { title, handleChangeTitle, deleteList } = this.props;

        return (
            <div className="List-Title-Edit" ref={this.ref}>
                <TextareaAutosize
                    autoFocus
                    className="List-Title-Textarea"
                    placeholder="Enter list title..."
                    value={title}
                    onChange={handleChangeTitle}
                    onKeyDown={this.onEnter}
                    style={{ width: deleteList ? 220 : 245 }}
                />
                {deleteList && <ion-icon name="trash" onClick={deleteList} />}
            </div>
        );
    }
}*/

const ListEditor = (props) => {
    const ref = React.createRef();

    const onEnter = e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            props.saveList();
        }
    };

    const handleClick = e => {
        const node = ref.current;

        if (node.contains(e.target)) {
            return;
        }

        props.onClickOutside();
    };

    useEffect(() => {
        document.addEventListener("click", handleClick, false);
        return () => {
            document.removeEventListener("click", handleClick, false);
        };
    });

    const {title, handleChangeTitle, deleteList} = props;

    return (
        <div className="List-Title-Edit" ref={ref}>
            <TextareaAutosize
                autoFocus
                className="List-Title-Textarea"
                placeholder="Enter list title..."
                value={title}
                onChange={handleChangeTitle}
                onKeyDown={onEnter}
                style={{width: deleteList ? 220 : 245}}
            />
            {deleteList && <ion-icon name="trash" onClick={deleteList}/>}
        </div>
    );
};

export default ListEditor;