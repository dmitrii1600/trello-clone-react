import "../styles/List.css";

import React, {useState} from "react";
import {connect} from "react-redux";

import Card from "./Card";

import shortid from "shortid";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";
import {addCardAC, changeListTitleAC, deleteListAC} from "../redux/actionCreators";
import {Draggable, Droppable} from "react-beautiful-dnd";

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
                        <div className="List_Title" onClick={toggleEditingTitle}>
                            {list.title}
                        </div>
                    )}
                    <hr/>
                    <Droppable droppableId={list._id}>
                        {(provided, _snapshot) => (
                            <div ref={provided.innerRef}>
                                <br/>
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
                        <div className="Toggle_Add_Card" onClick={toggleAddingCard}>
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