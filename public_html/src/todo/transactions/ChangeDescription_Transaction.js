'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeDescription_Transaction extends jsTPS_Transaction {
    constructor(initModel, item) {
        super();
        this.model = initModel;
        this.item = item;
        this.oldDescription = item.getOldDescription();
        this.description = item.getDescription();
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.changeItemDescription(this.item, this.description);
    }

    undoTransaction() {
        this.model.changeItemDescription(this.item, this.oldDescription);
    }
}