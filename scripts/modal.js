function modal(title, content){
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

export {modal};