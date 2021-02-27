'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class SwapItems_Transaction extends jsTPS_Transaction {
    constructor(initModel, up, index) {
        super();
        this.model = initModel;
        this.up = up;
        this.index = index;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.swapItems(this.up, this.index);
    }

    undoTransaction() {
        let undoDirection = !(this.up);
        this.model.swapItems(undoDirection, this.index - 1);
    }
}