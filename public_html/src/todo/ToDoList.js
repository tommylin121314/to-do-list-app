'use strict'

/**
 * ToDoList.js
 * 
 * This class represents a list with all the items in our todo list.
 * 
 * @author McKilla Gorilla
 */
export default class ToDoList {
    /**
     * The constructor creates a default, empty list.
     */
    constructor(initId) {
        this.id = initId;
        this.oldName = '';
        this.name = "Unnknown";
        this.items = [];
    }   
    
    // GETTER/SETTER METHODS

    setName(initName) {
        this.name = initName;
    }

    getName() {
        return this.name;
    }

    setOldName(initName) {
        this.oldName = initName;
    }

    getOldName() {
        return this.oldName;
    }

    getId() {
        return this.id;
    }

    /**
     * Adds an item to the end of the list.
     * 
     * @param {TodoListItem} itemToAdd Item to add to the list.
     */
    addItem(itemToAdd) {
        this.items.push(itemToAdd);
    }

    changeItemStatus(itemId) {
        for(let i = 0; i < this.items.length; i++) {
            if(itemId == this.items[i].getId()) {
                let item = this.items[i];
                if(item.getStatus() == 'complete') {
                    item.setStatus('incomplete');
                }
                else {
                    item.setStatus('complete');
                }
                break;
            }
        }
    }

    changeItemDate(id, date) {
        let index = this.getIndexOfId(id);
        this.items[index].setDueDate(date);
    }

    changeItemOldDate(index, oldDate) {
        this.items[index].setOldDate(oldDate);
    }

    changeItemOldDescription(index, oldDescription) {
        this.items[index].setOldDescription(oldDescription);
    }

    changeItemDescription(item, description) {
        let index = this.getIndexOfItem(item);
        this.items[index].setDescription(description);
    }

    /**
     * Finds and then removes the argument from the list.
     * 
     * @param {TodoListItem} itemToRemove Item to remove from the list.
     */
    removeItem(itemId) {
        let indexOfItem = -1;
        for (let i = 0; (i < this.items.length) && (indexOfItem < 0); i++) {
            if (this.items[i].id == itemId) {
                indexOfItem = i;
            }
        }
        let itemRemoved = this.items[indexOfItem];
        this.items.splice(indexOfItem, 1);
        return itemRemoved;
    }

    swapItems(up, index) {
        if(up) {
            let temp = this.items[index];
            this.items[index] = this.items[index - 1];
            this.items[index - 1] = temp;
        }
        else {
            let temp = this.items[index];
            this.items[index] = this.items[index + 1];
            this.items[index + 1] = temp;
        }
    }

    insertItem(index, item) {
        if(index >= this.items.length || index < 0) {
            return;
        }
        for(let i = this.items.length; i > index; i--) {
            this.items[i] = this.items[i - 1];
        }
        this.items[index] = item;
    }

    /**
     * Finds the index of the argument in the list.
     * 
     * @param {TodoListItem} item Item to search for in the list.
     */
    getIndexOfItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem === item) {
                return i;
            }
        }
        return -1;
    }
    getIndexOfId(itemId) {
        for (let i = 0; i < this.items.length; i++) {
            let testItem = this.items[i];
            if (testItem.id == itemId) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Gets and returns the item at the index location.
     * 
     * @param {Number} index Location in the list of item to return.
     */
    getItemAtIndex(index) {
        return this.items[index];
    }
}