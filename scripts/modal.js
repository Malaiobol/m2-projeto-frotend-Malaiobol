function modalAlert(title, content){
    const body = document.querySelector("body");

    const modalContainer = document.createElement("div");
    //modalContainer.classList.add("");

    const modalTitle = document.createElement("h3");
    //modalTitle.classList.add("");
    modalTitle.innerText = title;  
    
    const modalContent  = document.createElement("p");
    //modalContent.classList.add("");
    modalContent.innerText = content;

    modalContainer.append(modalTitle, modalContent);
    body.append(modalContainer);
}

function openModal(children){
    const body = document.querySelector("body");

    const backgroundModal = document.createElement("div");
    backgroundModal.classList.add("background-modal");

    const modalContainer = document.createElement("section");
    modalContainer.classList.add("modal-container");

    const closeModalButton = document.createElement("button");
    closeModalButton.classList.add("close_modal");
    closeModalButton.id = "closeModalButton"
    closeModalButton.innerText = "X";
    closeModalButton.addEventListener("click", ()=>{
        backgroundModal.remove()
    })

    modalContainer.append(closeModalButton, children);
    backgroundModal.append(modalContainer);
    body.append(backgroundModal);
}
export {modalAlert, openModal};