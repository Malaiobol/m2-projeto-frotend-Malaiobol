import { registerRequest } from "./requests.js";

function resgisterTry(){
    const form = document.querySelector(".register-container");
    const elements = [...form.elements];

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {};

        elements.forEach(elem => {
            if(elem.tagName === "INPUT" && elem.value !== ""){
                body[elem.id] = elem.value
            }
        })
        await registerRequest(body);
    })  
}

export {resgisterTry};
