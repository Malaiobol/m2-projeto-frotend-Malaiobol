import {toastAlert} from "../toast.js";
import { getLocalStorage } from "../localStorage.js";

const baseURL = "http://localhost:6278/";

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
        const response = await request.json();
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

async function editUserProfile(body){
    const token = getLocalStorage();
    try{
        const request = await fetch(baseURL + "users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log(err)
    }
}


export {filterCompanie, getAllCoworkers, getUserInfo, getUserDepartment, editUserProfile}