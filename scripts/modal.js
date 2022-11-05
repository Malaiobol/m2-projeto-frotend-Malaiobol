function openModal(children){
    const body = document.querySelector("body");

    const backgroundModal = document.createElement("div");
    backgroundModal.classList.add("modal-background");

    const modalContainer = document.createElement("section");
    modalContainer.classList.add("modal-container");
    modalContainer.classList.add("block");

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
export {openModal};