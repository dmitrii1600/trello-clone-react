import "../styles/AddList.css";

import React, {Component, useState} from "react";
import {connect} from "react-redux";
import shortid from "shortid";

import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import {addListAC} from "../redux/actionCreators";

/*
class AddList extends Component {
    state = {
        title: ""
    };


    handleChangeTitle = e => this.setState({ title: e.target.value });

    createList = () => {
        const { title } = this.state;

        this.props.toggleAddingList();
        this.props.addListAC(shortid.generate(), title);
    };

    render() {
        const { toggleAddingList } = this.props;
        const { title } = this.state;

        return (
            <div className="Add-List-Editor">
                <ListEditor
                    title={title}
                    handleChangeTitle={this.handleChangeTitle}
                    onClickOutside={toggleAddingList}
                    saveList={this.createList}
                />

                <EditButtons
                    handleSave={this.createList}
                    saveLabel={"Add list"}
                    handleCancel={toggleAddingList}
                />
            </div>
        );
    }
}
*/


const AddList = (props) => {

    const [title, setTitle] = useState("");

    const handleChangeTitle = e => setTitle(e.target.value);

    const createList = () => {
        props.toggleAddingList();
        props.addListAC(shortid.generate(), title);
    };

    const {toggleAddingList} = props;

    return (
        <div className="Add-List-Editor">
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