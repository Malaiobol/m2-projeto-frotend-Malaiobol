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

function editModal(){
    const body = document.querySelector("body");

    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");
    modalBackground.classList.add("flex");

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const modalCloser = document.createElement("button");
    modalCloser.innerText = "X";

    modalBody.innerHTML = `
    <h3 class="modal_title">Editar Perfil</h3>
    <form class="change_stack block">
        <input  class="default_input" type="text"     placeholder="Seu nome">
        <input  class="default_input" type="email"    placeholder="Seu email">
        <input  class="default_input" type="password" placeholder="Sua senha">
        <button class="purple_button" type="submit">Editar Perfil</button>
    </form>
    `

    modalCloser.addEventListener("click", ()=>{
        modalBackground.remove();
    })

    modalBackground.addEventListener("click", ()=>{
        modalBackground.remove();
    })

    modalBody.append(modalCloser);
    modalBackground.append(modalBody);
    body.append(modalBackground);
}

export {modalAlert, editModal};