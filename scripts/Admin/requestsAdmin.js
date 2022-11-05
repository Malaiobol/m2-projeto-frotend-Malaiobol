import { toastAlert } from "../toast.js";
import { getLocalStorage } from "../localStorage.js";
const baseURL = "http://localhost:6278/";

async function createDepartmentRequest(body){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
            body: JSON.stringify(body)
        })
        console.log(request);
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Departamento criado com sucesso!")
        } else {
            toastAlert("Algo deu Errado!", "error", "Não foi possível criar seu departamento");
        }
        const  response = await request.json();
        console.log(response);
        return response
    }catch(err){
        console.log(err);
    }
}

async function deleteDepartmentRequest(idPost){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/" + idPost, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Departamento deletado com sucesso!")
        }
    } catch(err){
        console.log(err);
    }
}

async function filterDepartment(companie){
    const adminToken = getLocalStorage()
    try{
        const request = await fetch(baseURL + "departments/" + `${companie}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log(err)
    }
}

async function updateDescription(body, companie){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/" + companie, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Descrição alterada!")
        } else {
            toastAlert("Algo deu Errado!", "error", "Não foi possível alterar sua descrição");
        }
        const  response = await request.json();
        return response
    } catch(err){
        console.log(err);
    }
}

async function getAllDepartments(){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        })
        const response = await request.json();
        return response
    }catch(err){
        console.log(err)
    }
}

async function getAllUsers(){
    const adminToken = getLocalStorage()
    try{
        const request = await fetch(baseURL + "users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
        })
        const response = await request.json();
        console.log(response);
        return response;
    }catch(err){
        console.log(err)
    }
}

async function contractUser(body){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/hire", {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Usuário contratado com sucesso!")
        }
        const  response = await request.json();
        return response
    }catch(err){
        console.log(err)
    }
}

async function dismissUser(user){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/dismiss/" + user,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Usuário dispensado com sucesso!")
        }
    }catch(err){
        console.log(err)
    }
}

async function getFreeUsers(){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "admin/out_of_work", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        })
        const response = await request.json()
        return response;
    }catch(err){
        console.log(err)
    }
}

async function deleteUserAdm(user){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "admin/delete_user/" + user, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            }
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Usuário excluido com sucesso!")
        }
    }catch(err){
        console.log(err)
    }
}

async function editUserAdm(userID, body){
    const adminToken = getLocalStorage();
    try{
        const request = await fetch(baseURL + "admin/update_user/" + userID, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`
            },
            body: JSON.stringify(body)
        })
        const response = request.json();
        return response;
    }catch(err){
        console.log(err)
    }
}

export {
    createDepartmentRequest, deleteDepartmentRequest, filterDepartment, 
    updateDescription, getAllDepartments, getAllUsers, 
    contractUser, dismissUser, getFreeUsers,
    deleteUserAdm, editUserAdm
}