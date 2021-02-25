'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, id) {
        super();
        this.model = initModel;
        this.id = id;
        this.index = 1;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        console.log("remove item transaction made");
        this.itemRemoved = this.model.removeItem(this.id);
        console.log(this.itemRemoved.getDescription());
        console.log("index: " + this.index);
    }

    undoTransaction() {
        this.model.insertItem(this.index, this.itemRemoved);
    }
}