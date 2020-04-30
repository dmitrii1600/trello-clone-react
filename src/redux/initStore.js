import shortid from "shortid";
import {addCardAC, addListAC} from "./actionCreators";

export default store => {
    console.log("Insert list 1");

    const firstListId = shortid.generate();
    const listTitle = "List 1";
    store.dispatch(addListAC(firstListId, listTitle));

    console.log("Insert card 1");
    let cardId = shortid.generate();
    let cardText = "Card 1";
    store.dispatch(addCardAC(firstListId, cardId, cardText));

    console.log("Insert card 2");
    cardId = shortid.generate();
    cardText = "Card 1";
    store.dispatch(addCardAC(firstListId, cardId, cardText));


};