import "../styles/List.css";

import React, {Component, useState} from "react";
import {connect} from "react-redux";

import Card from "./Card";

import shortid from "shortid";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import {addCardAC, changeListTitleAC, deleteListAC} from "../redux/actionCreators";
import {Draggable, Droppable} from "react-beautiful-dnd";
/*
class List extends Component {

    state = {
        editingTitle: false,
        title: this.props.list.title,
        addingCard: false
    };
    toggleEditingTitle = () =>
        this.setState({editingTitle: !this.state.editingTitle});

    handleChangeTitle = e => this.setState({title: e.target.value});

    editListTitle = () => {
        const {listId} = this.props;
        const {title} = this.state;

        this.toggleEditingTitle();

        this.props.changeListTitleAC(listId, title);
    };

    deleteList = () => {
        const {listId, list} = this.props;

        this.props.deleteListAC(listId, list.cards);
    };

    toggleAddingCard = () =>
        this.setState({addingCard: !this.state.addingCard});

    addCard = cardText => {
        const {listId} = this.props;

        this.toggleAddingCard();

        const cardId = shortid.generate();

        this.props.addCardAC(listId, cardId, cardText);
    };

    render() {
        const {list, index} = this.props;
        const {editingTitle, addingCard, title} = this.state;

        return (
            <Draggable draggableId={list._id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="List"
                    >
                        {editingTitle ? (
                            <ListEditor
                                list={list}
                                title={title}
                                handleChangeTitle={this.handleChangeTitle}
                                saveList={this.editListTitle}
                                onClickOutside={this.editListTitle}
                                deleteList={this.deleteList}
                            />
                        ) : (
                            <div className="List-Title" onClick={this.toggleEditingTitle}>
                                {list.title}
                            </div>
                        )}

                        <Droppable droppableId={list._id}>
                            {(provided, _snapshot) => (
                                <div ref={provided.innerRef}>
                                    {list.cards &&
                                    list.cards.map((cardId, index) => (
                                        <Card
                                            key={cardId}
                                            cardId={cardId}
                                            index={index}
                                            listId={list._id}
                                        />
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        {addingCard ? (
                            <CardEditor
                                onSave={this.addCard}
                                onCancel={this.toggleAddingCard}
                                adding
                            />
                        ) : (
                            <div className="Toggle-Add-Card" onClick={this.toggleAddingCard}>
                                <ion-icon name="add"/>
                                Add a card
                            </div>
                        )}
                    </div>
                )}
            </Draggable>
        );
    }
}*/


const List = (props) => {

    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(props.list.title);
    const [addingCard, setAddingCard] = useState(false);

    const toggleEditingTitle = () => setEditingTitle(!editingTitle);

    const handleChangeTitle = e => setTitle(e.target.value);

    const editListTitle = () => {
        const {listId} = props;

        toggleEditingTitle();

        props.changeListTitleAC(listId, title);
    };

    const deleteList = () => {
        const {listId, list} = props;

        props.deleteListAC(listId, list.cards);
    };

    const toggleAddingCard = () =>
        setAddingCard(!addingCard);

    const addCard = cardText => {
        const {listId} = props;

        toggleAddingCard();

        const cardId = shortid.generate();

        props.addCardAC(listId, cardId, cardText);
    };


    const {list, index} = props;

    return (
        <Draggable draggableId={list._id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="List"
                >
                    {editingTitle ? (
                        <ListEditor
                            list={list}
                            title={title}
                            handleChangeTitle={handleChangeTitle}
                            saveList={editListTitle}
                            onClickOutside={editListTitle}
                            deleteList={deleteList}
                        />
                    ) : (
                        <div className="List-Title" onClick={toggleEditingTitle}>
                            {list.title}
                        </div>
                    )}

                    <Droppable droppableId={list._id}>
                        {(provided, _snapshot) => (
                            <div ref={provided.innerRef}>
                                {list.cards &&
                                list.cards.map((cardId, index) => (
                                    <Card
                                        key={cardId}
                                        cardId={cardId}
                                        index={index}
                                        listId={list._id}
                                    />
                                ))}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {addingCard ? (
                        <CardEditor
                            onSave={addCard}
                            onCancel={toggleAddingCard}
                            adding
                        />
                    ) : (
                        <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
                            <ion-icon name="add"/>
                            Add a card
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );

};

const mapStateToProps = (state, ownProps) => ({
    list: state.listsById[ownProps.listId]
});

export default connect(mapStateToProps, {changeListTitleAC, addCardAC, deleteListAC})(List);