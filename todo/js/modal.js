// ModalEvent 클래스는 모달 다이얼로그와 관련된 이벤트를 처리하는 메서드를 제공합니다.
class ModalEvent {
    // ModalEvent 클래스는 싱글톤 패턴으로 구현되어 있습니다. 
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ModalEvent();
        }
        return this.#instance;
    }

    // addEventCancelClick 메서드는 취소 버튼을 클릭했을 때 모달 다이얼로그를 닫는 이벤트를 처리합니다.
    addEventCancelClick(){
        const modalCancelButton = document.querySelector(".modal-cancel-button");
        modalCancelButton.onclick = () => {
            ModalService.getInstance().closeModal();
        }
    }

    // addEventRemoveOkClick 메서드는 삭제 버튼을 클릭했을 때 해당 항목을 삭제하고 
    // 로컬 스토리지를 업데이트한 후 모달 다이얼로그를 닫는 이벤트를 처리합니다.
    addEventRemoveOkClick(removeIndex) {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
            TodoService.getInstance().todoList.splice(removeIndex, 1);
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }

    // addEventModifyOkClick 메서드는 수정 버튼을 클릭했을 때 입력된 값을 가져와 해당 항목을 수정하고 
    // 로컬 스토리지를 업데이트한 후 모달 다이얼로그를 닫는 이벤트를 처리합니다.
    addEventModifyOkClick(modifyIndex) {
        const modalOkButton = document.querySelector(".modal-ok-button");
        modalOkButton.onclick = () => {
            const todoModifyInput = document.querySelector(".todo-modify-input").value;
            TodoService.getInstance().todoList[modifyIndex].todoContent = todoModifyInput;
            TodoService.getInstance().updateLocalStorage();
            ModalService.getInstance().closeModal();
        }
    }
    
}
// 이 코드는 수정과 삭제Modal(모달)을 생성하고 제어하는 ModalService 클래스를 정의합니다. 
class ModalService {
    // 이 클래스는 싱글톤 패턴을 사용하여 인스턴스화됩니다.
    static #instance = null;
    static getInstance() {
        if(this.#instance == null){
            this.#instance = new ModalService();
        }
        return this.#instance;
    }
    // showModal() 메소드는 모달 컨테이너를 보이게 만듭니다.
    showModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.remove("modal-hidden");
    }

    // closeModal() 메소드는 모달 컨테이너를 숨깁니다.
    closeModal() {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.classList.add("modal-hidden");
    }

    // showRemoveModal()은 삭제 모달 창을 만들고, 확인 또는 취소 버튼 클릭 이벤트를 등록합니다.
    showRemoveModal(removeIndex) {
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-tilte">ToDo 삭제</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">ToDo를 삭제하시겠습니까?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        // ModalEvent의 addEventRemoveOkClick()을 removeIndex번째 값에 적용시킨다.
        ModalEvent.getInstance().addEventRemoveOkClick(removeIndex);
        // ModalEvent의 addEventCancelClick()을 실행킨다.
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();
    }

    // showModifyModal()은 선택한 ToDo 항목의 내용을 수정하는 모달 창을 만들고, 확인 또는 취소 버튼 클릭 이벤트를 등록합니다.
    showModifyModal(modifyIndex) {
        const todoObj = TodoService.getInstance().todoList[modifyIndex];
        const modalSection = document.querySelector(".modal-section");
        modalSection.innerHTML = `
            <div class="modal-header">
                <h1 class="modal-tilte">ToDo 수정</h1>
            </div>
            <div class="modal-main">
                <p class="modal-message">${todoObj.todoDate} ${todoObj.todoDateTime}</p>
                <input type-"text" class="todo-modify-input" value="${todoObj.todoContent}">
            </div>
            <div class="modal-footer">
                <button type="button" class="modal-ok-button">확인</button>
                <button type="button" class="modal-cancel-button">취소</button>
            </div>
        `;
        // ModalEvent의 addEventModifyOkClick()을 modifyIndex번째 값에 적용시킨다.
        ModalEvent.getInstance().addEventModifyOkClick(modifyIndex);
        // ModalEvent의 addEventCancelClick()을 실행킨다.
        ModalEvent.getInstance().addEventCancelClick();
        this.showModal();
    }
}