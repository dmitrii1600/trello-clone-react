import * as actionTypes from "./actionTypes";

export const addListAC = () => ({type: actionTypes.ADD_LIST});
export const moveListAC = () => ({type: actionTypes.MOVE_LIST});
export const deleteListAC = () => ({type: actionTypes.DELETE_LIST});
export const changeListTitleAC = () => ({type: actionTypes.CHANGE_LIST_TITLE});
export const addCard = () => ({type: actionTypes.ADD_CARD});
export const moveCard = () => ({type: actionTypes.MOVE_CARD});
export const deleteCard = () => ({type: actionTypes.DELETE_CARD});
export const changeCardText = () => ({type: actionTypes.CHANGE_CARD_TEXT});