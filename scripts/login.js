import {loginRequest, verifyUser} from "./requests.js";
import {getLocalStorage} from "./localStorage.js";

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

async function verifyUserType(){
    const userLogged = getLocalStorage();
    const validateToken = await verifyUser(userLogged);
    if(validateToken === ""){
        window.location.replace("/pages/index.html");
    }
}

function logOut(){
    const logOutButton = document.querySelector(".return_button");

    logOutButton.addEventListener("click", ()=>{
        localStorage.removeItem("user");
        window.location.replace("/pages/index.html");
    })
}


export {loginTry, verifyUserType, logOut};