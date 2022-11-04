import {modalAlert} from "./modal.js";
import { getLocalStorage } from "./localStorage.js";

const baseURL = "http://localhost:6278/";

async function verifyUser(token){
    try{
        const request = await fetch(baseURL + "auth/validate_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();
        return response.is_admin;
    }catch(err){
        console.log(err)
    }
}


async function loginRequest(body){
    try{
        const request = await fetch(baseURL + "auth/login",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response = await request.json()   

            if(await verifyUser(response.token) === false){   
                localStorage.setItem("user", response.token);
                modalAlert("Sucesso!", "Login feito com sucesso!");
                setTimeout(window.location.replace("/pages/post/index.html"),4000);
            } else{
                localStorage.setItem("user", response.token);
                modalAlert("Sucesso!", "Login feito com sucesso!");
                setTimeout( window.location.replace("/pages/admin/index.html"),4000);
            }
            
        }
    } catch(err){
        console.log("Não foi possível concluir sua requisição", err)
    }
}

async function registerRequest(body){
    try{
        console.log(body);
        const request = await fetch(baseURL + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            setTimeout(()=>{
                window.location.replace("/pages/login/index.html")
            }, 4000)
            console.log("Sucesso");
        }
    }catch(err){
        console.log(err);
    }
}

async function getAllCompanies(){
    try{
        const request = await fetch(baseURL + "companies", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        const response = await request.json();
        return response
    }catch(err){
        console.log("voce errou algo, burro!", err)
    }
}

async function filterCompanie(section){
    const token = localStorage.getItem("user");
    try{
        const request = await fetch(baseURL + "companies/" + `${section}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
            Authorization: `Bearer ${token}`
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log("errou algo, burro!", err)
    }
}

async function getAllCoworkers(){
    const token = getLocalStorage();
    try{
        const request = await fetch(baseURL + "users/departments/coworkers",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = request.json();
        return response
    }catch(err){    
        console.log(err)
    }
}

async function getUserInfo(){
    const token = getLocalStorage();
    try{
        const request = await fetch(baseURL + "users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log("algo deu errado!", err)
    }
}

async function getUserDepartment(){
    const token = getLocalStorage();

    try{
        const request = await fetch(baseURL + "users/departments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json()
        return response;
    }catch(err){
        console.log(err)
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
        return response;
    }catch(err){
        console.log(err)
    }
}

async function createDepartment(body){
    const tokenAdmin = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(body)
        })
        const  response = await request.json();
        return response
    }catch(err){
        console.log(err);
    }
}

async function updatePost(body, companie){
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
        const  response = await request.json();
        return response
    } catch(err){
        console.log(err);
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
        const  response = await request.json();
        return response
    }catch(err){
        console.log(err)
    }
}

async function deleteDepartment(idPost){
    const tokenAdmin = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/" + idPost, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
            }
        })
    } catch(err){
        console.log(err);
    }
}

async function getDontWorkingUsers(){
    const tokenAdmin = getLocalStorage();
    try{
        const request = await fetch(baseURL + "admin/out_of_work", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
            }
        })
        const response = await request.json()
        return response;
    }catch(err){
        console.log(err)
    }
}

async function dismissUser(user){
    const tokenAdmin = getLocalStorage();
    try{
        const request = await fetch(baseURL + "departments/dismiss/" + user,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
            }
        })
    }catch(err){
        console.log(err)
    }
}

async function deleteUserAdmin(user){
    const tokenAdmin = getLocalStorage();
    try{
        const request = await fetch(baseURL + "admin/delete_user/" + user, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
            }
        })
    }catch(err){
        console.log(err)
    }
}

async function editUserAdmin(userID, body){
    const tokenAdmin = getLocalStorage();
    console.log(userID);
    console.log(body);
    try{
        const request = await fetch(baseURL + "admin/update_user/" + userID, {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokenAdmin}`
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
    loginRequest, registerRequest, 
    getAllCompanies, filterCompanie, 
    getUserInfo, getUserDepartment,
    verifyUser, filterDepartment, 
    getAllDepartments, getAllUsers,
    createDepartment, updatePost,
    contractUser, deleteDepartment,
    getDontWorkingUsers, dismissUser,
    deleteUserAdmin, editUserAdmin,
    getAllCoworkers,
}