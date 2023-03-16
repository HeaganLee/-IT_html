const statusList = new Array();
const addButton = document.getElementsByClassName("add-button");
addbutton[0].onclik = () => {
    const todoText = document.getElementsByClassName("todo-text");
    const todoList = document.getElementsByClassName("todo_list");
    todoList[0].innerHTML +=
    `<li><span class="todo-content">${todoText[0].value}</span> <button class="ok-button">확인</button></li>`;
    statusList.push(false);

    addEvent();
}

function addEvent() {
    const okButton = document.getElementsByClassName("ok-button");
    const totoList = document.getElementsByClassName("todo-content");
    for(let i = 0; i < okbutton.length; i++) {
        okButton[i].onclik = () => {
            if(statusList[i]){
                todocontent[i].style.color = "black";
                todocontent[i].style.textDecoration = 'none';
                statusList[i] = false;
            }else {
                todocontent[i].style.color = "red";
                todocontent[i].style.textDecoration = "line-through";
                statusList[i] = true;
            }
        }
    }
}