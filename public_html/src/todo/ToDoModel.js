'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import RemoveItem_Transaction from './transactions/removeItem_Transaction.js'
import ChangeItemStatus_Transaction from './transactions/ChangeItemStatus_Transaction.js'
import SwapItems_Transaction from './transactions/SwapItems_Transaction.js'
import ChangeDate_Transaction from './transactions/ChangeDate_Transaction.js'
import ChangeDescription_Transaction from './transactions/ChangeDescription_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        this.tps.addTransaction(transaction);
    }

    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList);
        return newItem;
    }

    changeListName(newName, id) {
        for(let i = 0; i < this.toDoLists.length; i++) {
        if(this.toDoLists[i].id == id && newName != this.toDoLists[i].name) {
                this.toDoLists[i].name = newName;
                console.log("list with id " + id + " changed name to " + this.toDoLists[i].name);
                return;
            }
        }
    }

    changeListOldName(oldName, id) {
        for(let i = 0; i < this.toDoLists.length; i++) {
            if(this.toDoLists[i].id == id) {
                this.toDoLists[i].oldName = oldName;
                return;
            }
        }
    }

    changeItemStatusTransaction(itemId) {
        let transaction = new ChangeItemStatus_Transaction(this, itemId);
        this.tps.addTransaction(transaction);
    }

    changeItemStatus(itemId) {
        this.currentList.changeItemStatus(itemId);
        this.view.viewList(this.currentList);
    }

    changeItemOldDate(id, oldDate) {
        let index = this.currentList.getIndexOfId(id);
        this.currentList.changeItemOldDate(index, oldDate);
    }

    changeItemDate(id, date) {
        this.currentList.changeItemDate(id, date);
        this.view.viewList(this.currentList);
    }

    changeItemOldDescription(id, oldDescription) {
        let index = this.currentList.getIndexOfId(id);
        this.currentList.changeItemOldDescription(index, oldDescription);
    }

    changeItemDescription(item, description) {
        this.currentList.changeItemDescription(item, description);
        this.view.viewList(this.currentList);
    }

    changeDescriptionTransaction(id, description) {
        let index = this.currentList.getIndexOfId(id);
        let item = this.currentList.items[index];
        item.setDescription(description);
        let transaction = new ChangeDescription_Transaction(this, item);
        this.tps.addTransaction(transaction);
    }

    changeItemDateTransaction(id, newDate) {
        let oldDate = this.currentList.items[this.currentList.getIndexOfId(id)].getOldDate();
        let transaction = new ChangeDate_Transaction(this, id, oldDate, newDate);
        this.tps.addTransaction(transaction);
    }

    clearCurrentList() {
        document.getElementById('delete-list-button').className += ' disabled-button';
        this.view.clearItemsList();
    }

    flushTransactions() {
        this.tps.clearAllTransactions();
    }
    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    insertItem(index, item) {
        console.log(index, item.getDescription());
        this.currentList.insertItem(index, item);
        this.view.viewList(this.currentList);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList);
        }
    }

    removeItemTransaction(id){
        let transaction = new RemoveItem_Transaction(this, id);
        this.tps.addTransaction(transaction);
    }
    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemId) {
        let itemRemoved = this.currentList.removeItem(itemId);
        this.view.viewList(this.currentList);
        return itemRemoved;
    }

    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
        this.view.clearItemsList();
        this.view.refreshLists(this.toDoLists);
    }

    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }

    swapItemsTransaction(id, up) {
        let index = this.currentList.getIndexOfId(id);

        if(up && (index == 0)) {
            return;
        }
        else if((!up) && (index == this.currentList.items.length - 1)) {
            return;
        }

        let transaction = new SwapItems_Transaction(this, up, index);
        this.tps.addTransaction(transaction);
    }

    swapItems(up, index) {
        this.currentList.swapItems(up, index);
        this.view.viewList(this.currentList);
    }

    getIndexOfId(id) {
        return this.currentList.getIndexOfId(id);
    }

    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    resetListsSelection() {
        this.view.resetListsSelection();
    }

    refreshListsView() {
        this.view.refreshLists(this.toDoLists);
    }

    setModelCurrentList(id) {
        for(let i = 0; i < this.toDoLists.length; i++) {
            if(this.toDoLists[i].id == id) {
                this.currentList = this.toDoLists[i];
                return;
            }
        }
    }
}