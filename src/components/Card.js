import "../styles/Card.css";

import React, {Component, useState} from "react";
import {connect} from "react-redux";
import CardEditor from "./CardEditor";
import {changeCardTextAC, deleteCardAC} from "../redux/actionCreators";
import {Draggable} from "react-beautiful-dnd";

/*class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            editing: false,
        };
    }

    startHover = () => this.setState({hover: true});
    endHover = () => this.setState({hover: false});

    startEditing = () =>
        this.setState({
            hover: false,
            editing: true,
            text: this.props.card.text
        });

    endEditing = () => this.setState({hover: false, editing: false});

    editCard = text => {
        const {card} = this.props;

        this.endEditing();

        this.props.changeCardTextAC(card._id, text);
    };

    deleteCard = () => {
        const {listId, card} = this.props;

        this.props.deleteCardAC(listId, card._id);
    };

    render() {
        const {card, index} = this.props;
        const {hover, editing} = this.state;

        if (!editing) {
            return (
                <Draggable draggableId={card._id} index={index}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                    className="Card"
                    onMouseEnter={this.startHover}
                    onMouseLeave={this.endHover}
                >
                    {hover && (
                        <div className="Card-Icons">
                            <div className="Card-Icon" onClick={this.startEditing}>
                                <ion-icon name="create"/>
                            </div>
                        </div>
                    )}
                    {card.text}
                </div>
                    )}
                </Draggable>
            );
        } else {
            return (
                <CardEditor
                    text={card.text}
                    onSave={this.editCard}
                    onDelete={this.deleteCard}
                    onCancel={this.endEditing}
                />
            );
        }
    }
}*/

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
                            <div className="Card-Icons">
                                <div className="Card-Icon" onClick={startEditing}>
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