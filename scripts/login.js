import { loginRequest } from "./requests.js";

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
        console.log(body); 
        await loginRequest(body);
    })
}

export {loginTry};