import { editUserProfile } from "./requestsUser.js";

async function editUser(){
    const form = document.createElement("form");
    form.classList.add("modal-form")
    form.insertAdjacentHTML("afterbegin",  ` 
        <h2 class="modal_title">Editar Perfil</h2>
        <input type="text" class="default_input" placeholder="Seu nome"   name="username"></input>
        <input type="text" class="default_input" placeholder="Seu email"  name="email"></input>
        <input type="text" class="default_input" placeholder="Sua senha"  name="password"></input>
        <button type="submit" class="purple_button">Editar Perfil</button>
    `)

    const elements = [...form.elements];

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const body = {};

        elements.forEach(({name, value})=>{
            if(name){
                body[name] = value
            } 
        })
        editUserProfile(body);
        window.location.reload();
    })
    return form
}

export {editUser};