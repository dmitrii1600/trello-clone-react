import "../styles/Board.css";

import React, {useState} from "react";
import {connect} from "react-redux";

import List from "./List";
import AddList from "./AddList";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {moveCardAC, moveListAC} from "../redux/actionCreators";

const Board = (props) => {

    const [addingList, setAddingList] = useState(false);

    const handleDragEnd = ({source, destination, type}) => {
        // dropped outside the allowed zones
        if (!destination) return;
        // Move list
        if (type === "COLUMN") {
            // Prevent update if nothing changed
            if (source.index !== destination.index) {

                props.moveListAC(source.index, destination.index);
            }
            return;
        }

        if (
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            props.moveCardAC({
                sourceListId: source.droppableId,
                destListId: destination.droppableId,
                oldCardIndex: source.index,
                newCardIndex: destination.index
            });
        }
    };

    const toggleAddingList = () => setAddingList(!addingList);

    const {board} = props;

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                {(provided, _snapshot) => (
                    <div className="Board" ref={provided.innerRef}>
                        {board.lists.map((listId, index) => {
                            return <List listId={listId} key={listId} index={index}/>;
                        })}

                        {provided.placeholder}

                        <div className="Add_List">
                            {addingList ? (
                                <AddList toggleAddingList={toggleAddingList}/>
                            ) : (
                                <div
                                    onClick={toggleAddingList}
                                    className="Add_List_Button"
                                >
                                    <ion-icon name="add"/>
                                    Add a list
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

const mapStateToProps = state => ({board: state.board});

export default connect(mapStateToProps, {moveCardAC, moveListAC})(Board);