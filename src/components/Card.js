import "../styles/Card.css";

import React, {Component} from "react";
import {connect} from "react-redux";
import CardEditor from "./CardEditor";
import {changeCardTextAC, deleteCardAC} from "../redux/actionCreators";

class Card extends Component {
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
        const {card} = this.props;
        const {hover, editing} = this.state;

        if (!editing) {
            return (
                <div
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
}

const mapStateToProps = (state, ownProps) => ({
    card: state.cardsById[ownProps.cardId]
});

export default connect(mapStateToProps, {changeCardTextAC, deleteCardAC})(Card);