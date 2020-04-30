import * as actionTypes from "./actionTypes";

export const addListAC = (listId, listTitle) => ({
    type: actionTypes.ADD_LIST,
    payload: {listId, listTitle}
});

export const moveListAC = (oldListIndex, newListIndex) => ({
    type: actionTypes.MOVE_LIST,
    payload: {oldListIndex, newListIndex}
});

export const deleteListAC = (listId, cards) => ({
    type: actionTypes.DELETE_LIST,
    payload: {listId, cards}
});
export const changeListTitleAC = (listId, listTitle) => ({
    type: actionTypes.CHANGE_LIST_TITLE,
    payload: {listId, listTitle}
});

export const addCardAC = (listId, cardId, cardText) => ({
    type: actionTypes.ADD_CARD,
    payload: {listId, cardId, cardText}
});

export const moveCardAC = ({oldCardIndex, newCardIndex, sourceListId, destListId}) => ({
    type: actionTypes.MOVE_CARD,
    payload: {oldCardIndex, newCardIndex, sourceListId, destListId}
});

export const deleteCardAC = (listId, cardId) => ({
    type: actionTypes.DELETE_CARD,
    payload: {listId, cardId}
});

export const changeCardTextAC = (cardId, cardText) => ({
    type: actionTypes.CHANGE_CARD_TEXT,
    payload: {cardId, cardText}
});
