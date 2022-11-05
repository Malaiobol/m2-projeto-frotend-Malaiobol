import { toLogin, toRegister } from "../../scripts/changeWindow.js";
import { getAllCompanies, filterCompanie } from "../../scripts/requests.js";


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

function renderCompanies(companies){
    const companiesContainer = document.getElementById("companieContainer");
   
    companiesContainer.innerHTML = "";

    companies.forEach((comp) => {
        const compBox = document.createElement("li");
        compBox.classList.add("companie");

        const compTitle = document.createElement("h4");
        compTitle.classList.add("companie_title");
        compTitle.innerText = `${comp.name}`;

        const compTimer = document.createElement("p");
        compTimer.classList.add("companie_timer");
        compTimer.innerText = `Abre ${comp.opening_hours} Horas`;

        const compSection = document.createElement("p");
        compSection.classList.add("companie_section");
        compSection.innerText = `${comp.sectors.description}`

        compBox.append(compTitle, compTimer, compSection);
        companiesContainer.append(compBox);
    });
}

async function defaultRender(){
    const companies = await getAllCompanies()
    renderCompanies(companies);
}

function filterCompanies(){
    const filter = document.getElementById("filterSelect");

    filter.addEventListener("change", async ()=> {
        const selectedCompanie = filter.value;
        
        if(selectedCompanie === "default"){
            defaultRender()
        } else {
            const companies = await filterCompanie(selectedCompanie);
            renderCompanies(companies);  
        }
    })
}

defaultRender();
filterCompanies();
openMenu();

toLogin();
toRegister();

