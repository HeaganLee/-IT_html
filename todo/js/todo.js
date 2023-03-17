let todoList = new Array();

class TodoEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoEvent();
        }
        return this.#instance;
    }

    addEventAddTodoClick() {
        const addTodoButton = document.querySelector(".add-todo-button");
        addTodoButton.onclick = () => {
            TodoService.getInstance().addTodo();
            const todoInput = document.querySelector(".todo-input");
            todoInput.value = ""
        }
    }

    addEventAddTodoKeyUp() {
        const todoInput = document.querySelector(".todo-input");
        todoInput.onkeyup = () => {
            if(window.event.keyCode == 13){
                const addTodoButton = document.querySelector(".add-todo-button");
                addTodoButton.click();
            }
        }
    }

    addEventRemoveTodoClick() {
        const removeButtons = document.querySelectorAll('.content-footer .remove-button');
        removeButtons.forEach((removeButton, index) => {
        removeButton.onclick = () => {
            ModalService.getInstance().showRemoveModal(index);
        }
       });
    }

    addEventModifyTodoClick() {
        const modifyButtons = document.querySelectorAll('.content-footer .modify-button');
        modifyButtons.forEach((modifyButton, index) => {
        modifyButton.onclick = () => {
            ModalService.getInstance().showModifyModal(index);
            }
        });
    }
}

class TodoService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new TodoService();
        }
        return this.#instance;
    }

    todoList = null;

    constructor() {
        if(localStorage.getItem("todoList") == null) {
            this.todoList = new Array();
        }else {
            this.todoList = JSON.parse(localStorage.getItem("todoList"));
        }
        this.loadTodoList();
    }

    updateLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.loadTodoList();
    }

    addTodo() {
        const todoInput = document.querySelector(".todo-input");
        const nowDate = new Date();

        const convertDay = (day) => {
            return day == 0 ? "일" 
                : day == 1 ? "월" 
                : day == 2 ? "화" 
                : day == 3 ? "수" 
                : day == 4 ? "목" 
                : day == 5 ? "금" : "토" 
        }

        const todoObj = {
            // 만약 변수명이 동일하다면 ""를 이용해주면 된다.
            todoDate: `${nowDate.getFullYear()}.${nowDate.getMonth() + 1}.${nowDate.getDate()}(${convertDay(nowDate.getDay())})`,
            todoDateTime: `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}`,
            todoContent: todoInput.value
        }

        this.todoList.push(todoObj);
        this.updateLocalStorage();
    }

    modifyTodo(modifyIndex) {
        const modalModifyText = document.querySelector(".modal-modify-text");
    
        const todoObj = {
            // 만약 변수명이 동일하다면 ""를 이용해주면 된다.
            todoDate: this.todoList[modifyIndex].todoDate,
            todoDateTime: this.todoList[modifyIndex].todoDateTime,
            todoContent: modalModifyText.value
        }

        this.todoList.splice(modifyIndex,1,todoObj);
        this.updateLocalStorage();
    }

    loadTodoList() {
        const todoContentList = document.querySelector(".todo-content-list");
        todoContentList.innerHTML = ``;

        // 그냥 추가하는 것 보다 반복문을 돌리는 이유는
        // 계속해서 추가되는 데이터의 양을 못 따라오기 때문에
        // 반복문을 돌려서 계속해서 초기화를 시키고 가지고 오는 것이다.
        // 모든 데이터를 취합해서 보여주어야 하기 때문에
        this.todoList.forEach(todoObj =>{

            todoContentList.innerHTML += `
            <li class="content-container">
                    <div class="content-header">
                        <div class="todo-date">${todoObj.todoDate}</div>
                        <div class="todo-date-time">${todoObj.todoDateTime}</div>
                    </div>
                    <div class="content-main">
                        ${todoObj.todoContent}
                    </div>
                    <div class="content-footer">
                        <button class="modify-button">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button class="remove-button">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </li>`;
        });

        TodoEvent.getInstance().addEventRemoveTodoClick();
        TodoEvent.getInstance().addEventModifyTodoClick();
    }
}