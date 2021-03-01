'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class ChangeListName_Transaction extends jsTPS_Transaction {
    constructor(initModel, list, oldName, newName) {
        super();
        this.model = initModel;
        this.oldName = oldName;
        this.newName = newName;
        this.list = list;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.list.name = this.newName;
        console.log(this.model.currentList.id + " changed to " + this.model.currentList.name);
        this.model.refreshListsView();
    }

    undoTransaction() {
        this.list.name = this.oldName;
        console.log("changed to " + this.model.currentList.name);
        this.model.refreshListsView();
    }
}