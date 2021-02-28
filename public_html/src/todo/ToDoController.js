'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;

        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            appModel.undo();
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        let deleteList = document.getElementById("delete-list-button");
        deleteList.onmousedown = function() {
            let modal = document.getElementById('my-modal');
            modal.style.display = 'block';
            document.getElementById('exit-delete').onclick = function() {
                modal.style.display = 'none';
            }
            document.getElementById('cancel-delete').onclick = function() {
                modal.style.display = 'none';
            }
            document.getElementById('confirm-delete').onclick = function() {
                appModel.removeCurrentList();
                modal.style.display = 'none';
            }
        }
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
        }
        document.getElementById("close-list-button").onmousedown = function() {
            appModel.clearCurrentList();
            appModel.resetListsSelection();
            document.getElementById('delete-list-button').className += " disabled-button";
            document.getElementById('add-item-button').className += " disabled-button";
            document.getElementById('close-list-button').className += " disabled-button";
        }
    }

    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        this.model.loadList(listId);
    }

    handleDeleteItemClicked(event) {
        let idOfItemDiv = event.target.parentElement.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.removeItemTransaction(itemId);
    }

    handleStatusSelectChanged(event) {
        let idOfItemDiv = event.target.parentElement.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.changeItemStatusTransaction(itemId);
    }

    handleArrowClicked(event, up) {
        let idOfItemDiv = event.target.parentElement.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.swapItemsTransaction(itemId, up);
    }

    handleDateChanged(event) {
        let idOfItemDiv = event.target.parentElement.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.changeItemDateTransaction(itemId, event.target.value);
    }

    handleDateFocus(event) {
        let idOfItemDiv = event.target.parentElement.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.changeItemOldDate(itemId, event.target.value);
    }

    handleTextFocus(event) {
        let idOfItemDiv = event.target.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.changeItemOldDescription(itemId, event.target.innerHTML);
    }

    handleTextChanged(event) {
        let idOfItemDiv = event.target.parentElement.id;
        let itemId = idOfItemDiv.slice(15);
        this.model.changeDescriptionTransaction(itemId, event.target.innerHTML);
    }

    handleListOnFocusEvent(event) {
        let listId = event.target.parentElement.id.slice(10);
        this.model.changeCurrentListOldName(listId, event.target.innerHTML);
    }

    flushTransactions() {
        document.getElementById('undo-button').className += " disabled-button";
        document.getElementById('redo-button').className += " disabled-button";
        this.model.flushTransactions();
    }

    setModelCurrentList(id) {
        this.model.setModelCurrentList(id);
    }

}