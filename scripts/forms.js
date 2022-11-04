import { 
        getAllCompanies, createDepartment, updatePost, contractUser, 
        deleteDepartment, getDontWorkingUsers, dismissUser,
        editUserAdmin, deleteUserAdmin
    } from "./requests.js";

async function editUser(){
    const form = document.createElement("form");
    form.classList.add("modal-form")
    form.insertAdjacentHTML("afterbegin",  ` 
        <h2 class="modal_title">Editar Perfil</h2>
        <input type="text" class="default_input" placeholder="Seu nome" name="username"></input>
        <input type="text" class="default_input" placeholder="Seu email" name="email"></input>
        <input type="text" class="default_input" placeholder="Sua senha" name="password"></input>
        <button type="submit" class="purple_button">Editar Perfil</button>
    `)

    form.addEventListener("submit", (e)=>{
        e.preventDefault();
        const body = {};

        elements.forEach(({name, value})=>{
            if(name){
                body[name] = value
            } 
        })
        createDepartment(body);
        backGroundModal.remove();
        // window.location.reload();
    })

    return form
}

async function generateDepartment(){
    const form = document.createElement("form");
    form.classList.add("modal-form")
    form.insertAdjacentHTML("afterbegin",  ` 
        <h3 class="modal_title">Criar Departamento</h3>
        <div class="inputs-container">
            <input type="text" name="name" placeholder="Nome do departamento" id="name" required>
            <input type="text" name="description" placeholder="Descrição" id="description" required>
            <select class="companies" name="company_uuid" id="company_uuid" required>
                <option value="">Selecionar Empresa</option>
            </select>
            <button type="submit" class="createDepartment">Criar Departamento</button>
        </div>
    `)

    const elements  = [...form.elements];
    const companiesList = [...await getAllCompanies()];
    const select = elements[2];

    companiesList.forEach(companie => {
        const option = document.createElement("option");
        option.innerText = companie.name;
        option.value = companie.uuid;

        select.append(option);
    });        

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const body = {};

        elements.forEach(({name, value})=>{
            if(name){
                body[name] = value
            } 
        })
        createDepartment(body);
        backGroundModal.remove();
        window.location.reload();
    })
    return form
}

async function editDepartment({description, uuid}){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin",  ` 
        <h2 class="modal_title">Editar Departamento</h2>
        <div class="content-container">
            <input  type="text"   class="input_area" name="description" value="${description}" required>
            <button type="submit" class="save_button purple_button">Salvar Alterações</button>
        </div>
    `)

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();

        const elements = [...form.elements]
        console.log(elements)
        const backGroundModal = document.querySelector(".background-modal");
        const body = {};

        elements.forEach(({name, value})=>{
            if(name){
                body[name] = value;
            }
           
        })
        backGroundModal.remove();
        await updatePost(body, uuid); 
        window.location.reload();
    })
    return form
}

async function openDepartment(companie){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin",  ` 
        <h2 class="department_name">${companie.name}</h2>
        <div class="department_stack">
            <p class="description_departament">${companie.description}</p>
            <p class="company_name">${companie.companies.name}</p>
        </div>
        <div class="user_contract">
            <select name="userName" id="" class="users">
                <option value="">Selecionar usuário</option>
            </select>
            <button class="green_button" id="contractButton">Contratar</button>
        </div>
        <ul class="users-list">
            <li class="user">
                <p class="user_name"></p>
                <p class="user_professional_level"></p>
                <p class="style_work"></p>
                <button class="white_button" id="turnOffButton">Desligar</button>
            </li>
        </ul>
    `)

    const elements =  [...form.elements]
    const select   = elements[0];
    const users = await getDontWorkingUsers();
    
    users.forEach(user =>{
        console.log(user);
        const option = document.createElement("option");
        option.innerText = user.username;
        option.value = user.uuid;
        select.append(option);
    })

    const contractButton = elements[1];
    contractButton.addEventListener("submit", async (e)=>{
        e.preventDefault();
        
        const backGroundModal = document.querySelector(".background-modal"); 
        let body = {};

        body = {
            user_uuid: `${select.value}`,
            department_uuid: `${companie.uuid}`
        }
        
        backGroundModal.remove();
        await contractUser(body); 
    })

    const turnOffButton = document.getElementById("turnOffButton")
    contractButton.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const backGroundModal = document.querySelector(".background-modal"); 

        backGroundModal.remove();
        await dismissUser(select.value); 
    })

    return form
}

async function deleteDepartmentForm(companie){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin", `
        <h3>Realmente deseja deletar</h3>
        <h2>o departamento ${companie.companies.name}</h2>
        <h3>e demitir seus funcionários?</h3>
        <button type="submit" class="green_button">Confirmar</button>
    `)

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        await deleteDepartment(companie.uuid);

        window.location.reload();
    })
    return form
}

function openEditUser(userID){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin", `
        <h2 class="modal_title">Editar Usuário</h2>
        <select class="default_select" type="" name="kind_of_work" placeholder="Selecionar modalidade de trabalho">
            <option value="presencial">Presencial</option>
            <option value="hibrido">Híbrido</option>
            <option value="homeOffice">Home Office</option>
        </select>
        <select class="default_select" type="" name="professional_level" placeholder="Selecionar nível profissional">
            <option value="junior">Junior</option>
            <option value="pleno">Pleno</option>
            <option value="sênior">Senior</option>
        </select>
        <button type="submit">Editar</button>
    `)

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();

        const elements = [...form.elements];
        const body = {};

        elements.forEach(({name, value}) =>{
            if(name){
                body[name] = value;
            }
        })
        await editUserAdmin(userID, body);

    })
    return form
}

function openDeleteUser(user){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin", `
        <h3>Realmente deseja remover o usuário ${user.username}?</h3>
        <button type="submit">Deletar</button>
    `)

    form.addEventListener("submit", async ()=>{
        await deleteUserAdmin(user.uuid);
    })
    return form
}

export {
    generateDepartment, editDepartment, openDepartment, 
    deleteDepartmentForm, openEditUser, openDeleteUser,
    editUser,
};