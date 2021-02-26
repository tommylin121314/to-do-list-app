'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeItemStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, id, oldDate, newDate) {
        super();
        this.model = initModel;
        this.id = id;
        this.oldDate = oldDate;
        this.newDate = newDate;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.changeItemDate(this.id, this.newDate);
    }

    undoTransaction() {
        this.model.changeItemDate(this.id, this.oldDate);
    }
}