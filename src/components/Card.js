import "../styles/Card.css";

import React, {useState} from "react";
import {connect} from "react-redux";
import CardEditor from "./CardEditor";
import {changeCardTextAC, deleteCardAC} from "../redux/actionCreators";
import {Draggable} from "react-beautiful-dnd";

const Card = (props) => {

    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState("");

    const startHover = () => setHover(true);
    const endHover = () => setHover(false);

    const startEditing = () => {
        setHover(false);
        setEditing(true);
        setText(props.card.text);
    };

    const endEditing = () => {
        setHover(false);
        setEditing(false);
    };

    const editCard = text => {
        const {card} = props;

        endEditing();

        props.changeCardTextAC(card._id, text);
    };

    const deleteCard = () => {
        const {listId, card} = props;
        props.deleteCardAC(listId, card._id);
    };

    const {card, index} = props;

    if (!editing) {
        return (
            <Draggable draggableId={card._id} index={index}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="Card"
                        onMouseEnter={startHover}
                        onMouseLeave={endHover}
                    >
                        {hover && (
                            <div className="Card_Icons">
                                <div className="Card_Icon" onClick={startEditing}>
                                    <ion-icon name="create"/>
                                </div>
                            </div>
                        )}
                        {card.text}
                    </div>
                )}
            </Draggable>
        );
    } else return (
            <CardEditor
                text={card.text}
                onSave={editCard}
                onDelete={deleteCard}
                onCancel={endEditing}
            />
        );
};

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps, {changeCardTextAC, deleteCardAC})(Card);