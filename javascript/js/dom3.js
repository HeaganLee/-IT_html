/**
 * 1. 추가버튼 클릭시 input에 들어있는 value의 값을 list에 추가
 * 2. 확인버튼 클릭시 todo-content의 색상을 red로 변경, 취소선 적용
 * 3. 확인버튼 다시 클릭시 색상을 black으로 변경, 취소선은 미적용
 */
// document.getElementsByClassName("todo-text")[0].value;
// `${}`

const todolist = document.getElementsByClassName("todo-list");
const addbutton = document.getElementsByClassName("add-button");
const todocontent = document.getElementsByClassName("todo-content");
const okbutton = document.getElementsByClassName("ok-button");

addbutton[0].onclick = () => {
    todolist[0].innerHTML += `<li><span class="todo-content">${document.getElementsByClassName("todo-text")[0].value}</span> <button class="ok-button">확인</button></li>`
    
    todocontent[todocontent.length-1].style.color = "black";
    addEvent()
}

function addEvent(){
    for(let i = 0; i < okbutton.length; i++){
        okbutton[i].onclick = () => {
            if (todocontent[i].style.color == "black"){
                todocontent[i].style.color = "red"
                todocontent[i].style.textDecoration = 'line-through'
            } else if (todocontent[i].style.color == "red"){
                todocontent[i].style.color = "black"
                todocontent[i].style.textDecoration = 'none'
            }
        }
    } 
}