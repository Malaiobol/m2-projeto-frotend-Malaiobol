import {
    createDepartmentRequest, deleteDepartmentRequest, 
    updateDescription, contractUser, dismissUser, 
    getFreeUsers,deleteUserAdm, editUserAdm, 
} from "./requestsAdmin.js";

import { getAllCompanies} from "../requests.js"

async function createDepartment(){
    const form = document.createElement("form");

    form.classList.add("modal-form")
    form.insertAdjacentHTML("afterbegin",  ` 
        <h3 class="modal_title">Criar Departamento</h3>
        <div class="inputs-container">
            <input type="text" class="default_input" name="name" placeholder="Nome do departamento" id="name" required>
            <input type="text" class="default_input" name="description" placeholder="Descrição" id="description" required>
            <select class="companies" class="default_input" name="company_uuid" id="company_uuid" required>
                <option value="">Selecionar Empresa</option>
            </select>
            <button type="submit" class="createDepartment purple_button">Criar Departamento</button>
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
        await  createDepartmentRequest(body);
        setTimeout(()=>{
            window.location.reload()
        }, 4000)
        
    })
    return form
}

async function editDepartment({description, uuid}){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin",  ` 
        <h2 class="modal_title">Editar Departamento</h2>
        <div class="content-container">
            <textarea class="default_input area_input" name="description"required>${description}</textarea>
            <button type="submit" class="save_button purple_button">Salvar Alterações</button>
        </div>
    `)

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();

        const elements = [...form.elements]
        const body = {};

        elements.forEach(({name, value})=>{
            if(name){
                body[name] = value;
            }
           
        })
        await updateDescription(body, uuid); 
        setTimeout(()=>{
            window.location.reload();
        }, 4000)
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
            <button class="green_button" type="submit" id="contractButton">Contratar</button>
        </div>
            <li class="user">
                <p class="user_name"></p>
                <p class="user_professional_level"></p>
                <p class="style_work"></p>
                <button class="white_button" id="turnOffButton">Desligar</button>
            </li>
    `)
    const usersList = document.createElement("ul");
    usersList.classList.add("users-list");
    const elements =  [...form.elements]
    const select   = elements[0];
    const users = await getFreeUsers();
    users.forEach(user =>{
        const option = document.createElement("option");
        option.innerText = user.username;
        option.value = user.uuid;
        select.append(option);
    })
    const contractButton = elements[1];
    console.log(contractButton);
    contractButton.addEventListener("submit", async (e)=>{
        e.preventDefault();
        let body = {};
        body = {
            user_uuid: `${select.value}`,
            department_uuid: `${companie.uuid}`
        }
        console.log(body)
        await contractUser(body); 
    })
    return form
}

async function deleteDepartment(companie){
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
        await deleteDepartmentRequest(companie.uuid);

        setTimeout(() => {
            window.location.reload();
        }, 4000);
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
        await editUserAdm(userID, body);

    })
    return form
}

function openDeleteUser(user){
    const form = document.createElement("form");
    form.classList.add("modal-form");
    form.insertAdjacentHTML("afterbegin", `
        <h3 class="modal_message">Realmente deseja remover o usuário ${user.username}?</h3>
        <button type="submit" class="green_button deleteButton">Deletar</button>
    `)

    form.addEventListener("submit", async ()=>{
        await deleteUserAdm(user.uuid);
    })
    return form
}

export {
    createDepartment, editDepartment, openDepartment,
    deleteDepartment, openEditUser, openDeleteUser,
}