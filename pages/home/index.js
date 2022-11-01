import { toLogin, toRegister } from "../../scripts/changeWindow.js";
import { getAllCompanies } from "../../scripts/requests.js";

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

function openFilter(){
    const arrow = document.querySelector(".selecSect-header");
    const img = document.querySelector(".ss_img");
    const filterContainer = document.querySelector(".filter-container");
    arrow.addEventListener("click", ()=>{
        filterContainer.classList.toggle("filter-appear");
        img.classList.toggle("inverted")
    })
}

async function renderAllCompanies(){
    const companies = await getAllCompanies();
    const companiesContainer = document.getElementById("companieContainer");

    companies.forEach((comp) => {
        const compBox = document.createElement("li");
        compBox.classList.add("companie");

        const compTitle = document.createElement("h4");
        compTitle.classList.add("companie_title");
        compTitle.innerText = `${comp.name}`;

        const compTimer = document.createElement("p");
        compTimer.classList.add("companie_timer");
        compTimer.innerText = `${comp.opening_hours} Horas`;

        const compSection = document.createElement("p");
        compSection.classList.add("companie_section");
        compSection.innerText = `${comp.sectors.description}`

        compBox.append(compTitle, compTimer, compSection);
        companiesContainer.append(compBox);
    });
}
renderAllCompanies();
openFilter();
openMenu();
toLogin();
toRegister();