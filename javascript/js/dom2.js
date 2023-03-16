const box = document.getElementsByClassName("box");
box[0].style.backgroundColor = "black";

// addEvent() 메소드를 실행시킨다.
addEvent();

function addEvent () {
    const redButton = document.getElementsByClassName("red-button");
    const blueButton = document.getElementsByClassName("blue-button");

    // 생성된 box의 길이만큼 반복문을 돈다.
    for(let i = 0; i < box.length; i++) {
        // i번째 redButton과 blueButton의 순번에 이벤트가 발생 할 수 있도록 한다.
        redButton[i].onclick = () => {
            box[i].style.backgroundColor = "red";
        }
        blueButton[i].onclick = () => {
            box[i].style.backgroundColor = "blue";
        }
    }
}

// 추가 버튼을 클릭할때 마다.
// 버튼이 추가적으로 생성이 되도록 한다.
const addButton = document.getElementsByClassName("add-button");
addButton[0].onclick = () => {
    const container = document.getElementsByClassName("container");
    // inner html이 추가가 되면 객체가 새로 만들어 지면서
    // 이벤트를 잃어버리게 된다.
    container[0].innerHTML += `
        <div class="box"></div>
        <button class="red-button">빨간색</button>
        <button class="blue-button">파란색</button>
    `
    // 생성될때 마다 초기화를 방지하기 위해 생성된 box만 블랙으로 둔다.
    box[box.length-1].style.backgroundColor = "black";

    addEvent();
}
