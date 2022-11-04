import {loginRequest} from "./requests.js";
import { getLocalStorage } from "./localStorage.js";

function loginTry(){
    const form = document.querySelector(".login-container");
    const elements = [...form.elements];

    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const body = {}

        elements.forEach((elem) => {
            if(elem.tagName == "INPUT" && elem.value !== ""){
                body[elem.id] = elem.value
            }   
        })
        await loginRequest(body);
    })
}

function verifyLogin(){
    const token = getLocalStorage()
    if(token === ""){
        window.location.replace("/pages/index.html")
    }
}

export {loginTry, verifyLogin};