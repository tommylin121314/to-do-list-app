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
        let cont = this.controller;
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");

        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");

        let textNode = document.createElement('div');
        textNode.innerHTML = newList.name;
        textNode.contentEditable = true;
        listElement.appendChild(textNode);

        listElement.style.textAlign = 'center';
        listElement.style.height = '50px';
        listElement.style.verticalAlign = 'center';
        listElement.style.lineHeight = '50px';
        listElement.style.fontSize = '19px';
        listsElement.appendChild(listElement);

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {

            //Resets list styling to default
            for(var i = 0; i < listsElement.children.length; i++){
                listsElement.children.item(i).style.backgroundColor = '';
                listsElement.children.item(i).style.color = '';
            }

            //changes style of selected list
            listElement.style.color = '#000000';
            listElement.style.backgroundColor = '#FFC819';
            listsElement.insertBefore(listElement, listsElement.childNodes[0]);
            thisController.handleLoadList(newList.id);

            //clears transactions
            thisController.flushTransactions();
        }


        textNode.onfocus = (event) => {
            thisController.handleListNameFocus(event);
        }

        textNode.onblur = (event) => {
            thisController.handleListNameBlur(event);
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

    resetListsSelection() {
        let lists = document.getElementById("todo-lists-list").childNodes;
        for(let i = 0; i < lists.length; i++) {
            lists[i].style.backgroundColor = '';
            lists[i].style.color = '';
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
        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;

        document.getElementById('delete-list-button').className = 'list-item-control material-icons todo_button';
        document.getElementById('add-item-button').className = 'list-item-control material-icons todo_button';
        document.getElementById('close-list-button').className = 'list-item-control material-icons todo_button';
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();

        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];

            //TASK ELEMENT DIV
            let listItemElement = document.createElement("div");
            listItemElement.id = 'todo-list-item-' + listItem.id;
            listItemElement.className = 'list-item-card';
            listItemElement.style.borderBottom = 'solid';
            listItemElement.style.borderBottomWidth = '1px';

            //TASK NAME DIV
            let taskNameDiv = document.createElement('div');
            taskNameDiv.className = 'task-col';
            taskNameDiv.innerHTML = listItem.description;

            //DUE DATE DIV
            let dueDateDiv = document.createElement('div');
            dueDateDiv.className = 'due-date-col';
            let dateSelect = document.createElement('input');
            dateSelect.type = 'date';
            dateSelect.value = listItem.dueDate;
            dueDateDiv.appendChild(dateSelect);

            //STATUS DIV
            let statusDiv = document.createElement('div');
            statusDiv.className = 'status-col';
            let statusSelect = document.createElement('select');
            let statusOne = document.createElement('option');
            let statusTwo = document.createElement('option');
            statusOne.innerHTML = 'incomplete';
            statusTwo.innerHTML = 'complete';
            if(listItem.status == 'incomplete') {
                statusSelect.style.color = '#ffc819';
                statusOne.selected = true;
            }
            else {
                statusSelect.style.color = '#ffc819';
                statusSelect.style.color = 'dodgerblue';
                statusTwo.selected = true;
            }
            statusSelect.appendChild(statusOne);
            statusSelect.appendChild(statusTwo);
            statusSelect.style.width = '250px';
            statusDiv.appendChild(statusSelect);

            //CONTROL DIV
            let controlDiv = document.createElement('div');
            controlDiv.className = 'list-controls-col';

            //UP ARROW DIV
            let upArrow = document.createElement('div');
            upArrow.className = 'list-item-control material-icons';
            upArrow.innerHTML = 'keyboard_arrow_up';
            upArrow.id = 'up-arrow';

            //DOWN ARROW DIV
            let downArrow = document.createElement('div');
            downArrow.className = 'list-item-control material-icons';
            downArrow.innerHTML = 'keyboard_arrow_down';
            downArrow.id = 'down-arrow';

            if(i == 0) {
                upArrow.className += ' disabled-button';
            }

            if(i == list.items.length - 1) {
                downArrow.className += ' disabled-button';
            }

            //DELETE ITEM DIV
            let deleteListButton = document.createElement("div");
            deleteListButton.className = 'list-item-control material-icons';
            deleteListButton.innerHTML = 'close';
            deleteListButton.id = 'delete-item';

            //CONTROL DIVS
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

            listItemElement.onmouseenter = (event) => {
                listItemElement.style.backgroundColor = '#f9f7f111';
            }

            listItemElement.onmouseleave = (event) => {
                listItemElement.style.backgroundColor = '#40454e';
            }

            taskNameDiv.onmouseenter = (event) => {
                taskNameDiv.contentEditable = true;
            }

            taskNameDiv.onmouseleave = (event) => {
                taskNameDiv.contentEditable = false;
            }

            taskNameDiv.onfocus = (event) => {
                thisController.handleTextFocus(event);
            }

            taskNameDiv.onblur = (event) => {
                thisController.handleTextChanged(event);
            }

            upArrow.onclick = (event) => {
                thisController.handleArrowClicked(event, true);
            }

            downArrow.onclick = (event) => {
                thisController.handleArrowClicked(event, false);
            }

            deleteListButton.onclick = (event) => {
                thisController.handleDeleteItemClicked(event);
            }

            statusSelect.onchange = (event) => {
                thisController.handleStatusSelectChanged(event);
            }

            dateSelect.onchange = (event) => {
                thisController.handleDateChanged(event);
            }

            dateSelect.onfocus = (event) => {
                thisController.handleDateFocus(event);
            }

            //itemsListDiv.appendChild(listItemElement);
            itemsListDiv.appendChild(listItemElement);
        }
        setTimeout(() => {
            if(thisController.model.tps.hasTransactionToUndo()) {
                document.getElementById("undo-button").className = 'material-icons todo_button';
            }
            else {
                document.getElementById('undo-button').className += ' disabled-button';
            }
            if(thisController.model.tps.hasTransactionToRedo()) {
                document.getElementById("redo-button").className = 'material-icons todo_button';
            }
            else {
                document.getElementById('redo-button').className += ' disabled-button';
            }
        }, 20);
    }

    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}