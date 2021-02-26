'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeItemStatus_Transaction extends jsTPS_Transaction {
    constructor(initModel, id) {
        super();
        this.model = initModel;
        this.id = id;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.changeItemStatus(this.id);
    }

    undoTransaction() {
        this.model.changeItemStatus(this.id);
    }
}