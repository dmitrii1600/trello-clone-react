import * as actionTypes from "./actionTypes";
import { combineReducers, createStore } from "redux";
import throttle from "lodash.throttle";

const boardReducer = (state = {lists: []}, action) => {
    switch (action.type) {
        case actionTypes.ADD_LIST:
            const {listId} = action.payload;
            return {lists : [...state.lists, listId]};
        case actionTypes.MOVE_LIST:
            const {oldListIndex, newListIndex} = action.payload;
            const newLists = Array.from(state.lists);
            const [removedList] = newLists.splice(oldListIndex, 1);
            newLists.splice(newListIndex, 0, removedList);
            return {lists : newLists};
        case actionTypes.ADD_LIST:
            const {listId} = action.payload;
            const filteredList = state.lists.filter(id => id !== listId);
            return {lists: filteredList};
        default:
            return state;
    }
};

const listByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_LIST:
            const {listId, listTitle} = action.payload;
            return {
                ...state,
                [listId]: {_id: listId, title: listTitle, cards: []},
            };
        case actionTypes.CHANGE_LIST_TITLE:
            const {listId, listTitle} = action.payload;
            return {
                ...state,
                [listId]: {...state[listId], title: listTitle}
            };
        case actionTypes.DELETE_LIST:
            const {listId} = action.payload;
            const {[listId]: deletedList, ...restOfLists} = state;
            return restOfLists;
        case actionTypes.ADD_CARD:
            const {listId, cardId} = action.payload;
            return {
                ...state,
                [listId]: {...state[listId], cards: [...state[listId].cards, cardId]}
            };
        case actionTypes.MOVE_CARD:
            const {
                oldCardIndex,
                newCardIndex,
                sourceListId,
                destListId
            } = action.payload;
            // Move within the same list
            if (sourceListId === destListId) {
                const newCards = Array.from(state[sourceListId].cards);
                const [removedCard] = newCards.splice(oldCardIndex, 1);
                newCards.splice(newCardIndex, 0, removedCard);
                return {
                    ...state,
                    [sourceListId]: { ...state[sourceListId], cards: newCards }
                };
            }
            // Move card from one list to another
            const sourceCards = Array.from(state[sourceListId].cards);
            const [removedCard] = sourceCards.splice(oldCardIndex, 1);
            const destinationCards = Array.from(state[destListId].cards);
            destinationCards.splice(newCardIndex, 0, removedCard);
            return {
                ...state,
                [sourceListId]: { ...state[sourceListId], cards: sourceCards },
                [destListId]: { ...state[destListId], cards: destinationCards }
            };
        case actionTypes.DELETE_CARD:
            const {cardId, listId } = action.payload;
            const filteredCards = state.[listId].cards.filter(id => id !== cardId);
            return {
                ...state,
                [listId]: {...state[listId], cards: filteredCards}
            }
        default:
            return state;
    }
};

const cardByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.ADD_CARD:
            const {cardText, cardId} = action.payload;
            return {
                ...state, [cardId]: { _id: cardId, text: cardText}
            };
        case actionTypes.DELETE_CARD:
            const {cardId} = action.payload;
            const {[cardId]: deletedCard, ...restOfCards} = state;
            return restOfCards
        case actionTypes.CHANGE_CARD_TEXT:
            const {cardText, cardId} = action.payload;
            return {
                ...state, [cardId]: { ...state[cardId], text: cardText}
            };
        // Find every card from the deleted list and remove it
        case actionTypes.DELETE_LIST:
            const {cardIds} = action.payload;
            return Object.keys(state)
                .filter(id => !cardIds.includes(id))
                .reduce(
                    (newState, cardId) => ({...newState, [cardId]: state[cardId]}),
                    {}
                );
        default:
            return state;

    }
};

const reducers = combineReducers({
    board,
    listsById,
    cardsById
});

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    } catch {
        // ignore write errors
    }
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const persistedState = loadState();
const store = createStore(reducers, persistedState);

store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

export default store;