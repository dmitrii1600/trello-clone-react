import "../styles/Board.css";

import React, {Component} from "react";
import {connect} from "react-redux";

import List from "./List";
import AddList from "./AddList";
import {DragDropContext, Droppable,} from "react-beautiful-dnd";
import {moveCardAC, moveListAC} from "../redux/actionCreators";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addingList: false
        };
    }


    handleDragEnd = ({source, destination, type}) => {
        // dropped outside the allowed zones
        if (!destination) return;
        // Move list
        if (type === "COLUMN") {
            // Prevent update if nothing has changed
            if (source.index !== destination.index) {

               this.props.moveListAC(source.index, destination.index);
            }
            return;
        }

        if (
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            this.props.moveCardAC({
                sourceListId: source.droppableId,
                destListId: destination.droppableId,
                oldCardIndex: source.index,
                newCardIndex: destination.index
            });
        }
    };

    toggleAddingList = () =>
        this.setState({addingList: !this.state.addingList});

    render() {
        const {board} = this.props;
        const {addingList} = this.state;

        return (
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable droppableId="board" direction="horizontal" type="COLUMN">
                    {(provided, _snapshot) => (
                        <div className="Board" ref={provided.innerRef}>
                            {board.lists.map((listId, index) => {
                                return <List listId={listId} key={listId} index={index} />;
                            })}

                            {provided.placeholder}

                            <div className="Add-List">
                                {addingList ? (
                                    <AddList toggleAddingList={this.toggleAddingList} />
                                ) : (
                                    <div
                                        onClick={this.toggleAddingList}
                                        className="Add-List-Button"
                                    >
                                        <ion-icon name="add" /> Add a list
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

const mapStateToProps = state => ({board: state.board});

export default connect(mapStateToProps, {moveCardAC, moveListAC})(Board);