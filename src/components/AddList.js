import "../styles/AddList.css";

import React, {useState} from "react";
import {connect} from "react-redux";
import shortid from "shortid";

import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import {addListAC} from "../redux/actionCreators";

const AddList = (props) => {

    const [title, setTitle] = useState("");

    const handleChangeTitle = e => setTitle(e.target.value);

    const createList = () => {
        props.toggleAddingList();
        props.addListAC(shortid.generate(), title);
    };

    const {toggleAddingList} = props;

    return (
        <div className="Add_List_Editor">
            <ListEditor
                title={title}
                handleChangeTitle={handleChangeTitle}
                onClickOutside={toggleAddingList}
                saveList={createList}
            />

            <EditButtons
                handleSave={createList}
                saveLabel={"Add list"}
                handleCancel={toggleAddingList}
            />
        </div>
    );

}


export default connect(null, {addListAC})(AddList);