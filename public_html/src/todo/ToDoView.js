'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            for(var i = 0; i < listsElement.children.length; i++){
                listsElement.children.item(i).style.backgroundColor = '';
                listsElement.children.item(i).style.color = '#FFFFFF';
            }
            listElement.style.color = '#000000';
            listElement.style.backgroundColor = '#FFC819';
            listsElement.insertBefore(listElement, listsElement.childNodes[0]);
            thisController.handleLoadList(newList.id);
        }
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }

    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            //let listItemElementt = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                //+ "<div class='task-col' contenteditable>" + listItem.description + "</div>"
                                //+ "<div class='due-date-col'>" + listItem.dueDate + "</div>"
                                //+ "<div class='status-col'>" + listItem.status + "</div>"
                                //+ "<div class='list-controls-col'>"
                                //+ " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                //+ " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                //+ " <div class='list-item-control material-icons'>close</div>"
                                //+ " <div class='list-item-control'></div>"
                                //+ " <div class='list-item-control'></div>"
                                //+ "</div>";

            let listItemElement = document.createElement("div");
            listItemElement.id = 'todo-list-item-' + listItem.id;
            listItemElement.className = 'list-item-card';

            let taskNameDiv = document.createElement('div');
            taskNameDiv.className = 'task-col';
            taskNameDiv.innerHTML = listItem.description;

            let dueDateDiv = document.createElement('div');
            dueDateDiv.className = 'due-date-col';
            dueDateDiv.innerHTML = listItem.dueDate;

            let statusDiv = document.createElement('div');
            statusDiv.className = 'status-col';
            statusDiv.innerHTML = listItem.status;

            let controlDiv = document.createElement('div');
            controlDiv.className = 'list-controls-col';

            let upArrow = document.createElement('div');
            upArrow.className = 'list-item-control material-icons';
            upArrow.innerHTML = 'keyboard_arrow_up';

            let downArrow = document.createElement('div');
            downArrow.className = 'list-item-control material-icons';
            downArrow.innerHTML = 'keyboard_arrow_down';

            let deleteListButton = document.createElement("div");
            deleteListButton.className = 'list-item-control material-icons';
            deleteListButton.innerHTML = 'close';

            let listItemControlOne = document.createElement("div");
            listItemControlOne.className = 'list-item-control';

            let listItemControlTwo = document.createElement("div");
            listItemControlTwo.className = 'list-item-control';

            listItemElement.appendChild(taskNameDiv);
            listItemElement.appendChild(dueDateDiv);
            listItemElement.appendChild(statusDiv);
            controlDiv.appendChild(upArrow);
            controlDiv.appendChild(downArrow);
            controlDiv.appendChild(deleteListButton);
            controlDiv.appendChild(listItemControlOne);
            controlDiv.appendChild(listItemControlTwo);
            listItemElement.appendChild(controlDiv);

            //deleteListButton.onclick = (event) => {
            //    handleDeleteClicked(event);
            //}

            //itemsListDiv.appendChild(listItemElement);
            itemsListDiv.appendChild(listItemElement);
        }
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}