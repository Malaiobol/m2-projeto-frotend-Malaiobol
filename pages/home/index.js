import { toLogin, toRegister } from "../../scripts/changeWindow.js";

function openMenu(){
    const container = document.querySelector(".drop-down-container");
    const dropToast = document.querySelector(".dropdown_img");
    dropToast.addEventListener("click", ()=>{
        if(container.classList.contains !== "appear"){
            container.classList.toggle("appear");
            dropToast.src = ("/img/Vector - Opened.png");
        } else {
            container.classList.remove("appear");
            dropToast.src = ("/img/Vector.png");
        }
    })
} 

openMenu();
toLogin();
toRegister();