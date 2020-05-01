import "../styles/ListEditor.css";

import React, {useEffect} from "react";
import TextareaAutosize from "react-textarea-autosize";

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
        <div className="List_Title_Edit" ref={ref}>
            <TextareaAutosize
                autoFocus
                className="List_Title_Textarea"
                placeholder="List title"
                value={title}
                onChange={handleChangeTitle}
                onKeyDown={onEnter}
                style={{width: deleteList ? 250 : 275}}
            />
            {deleteList && <ion-icon name="trash" onClick={deleteList}/>}
        </div>
    );
};

export default ListEditor;