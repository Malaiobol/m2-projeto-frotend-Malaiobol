import { 
    getUserInfo, getUserDepartment, getAllCoworkers
} from "./requests.js"

async function renderProfile(){
    const userStack = await getUserInfo();
    const userName = document.querySelector(".user_name");
    userName.innerText = userStack.username;

    const userEmail = document.querySelector(".user_email");
    userEmail.innerText = userStack.email;

    const userProfLevel = document.querySelector(".user_professional_level");
    userProfLevel.innerText = userStack.professional_level;
}

async function renderCompany(){
    const userCompany = await getUserDepartment();
    const companyContainer = document.querySelector(".company-container");

    if(userCompany !== {"error": "you don't belong to a department"}){
        const companyHeader = document.createElement("div");
        companyHeader.classList.add("company_header");

        const companyName   = document.createElement("h4");
        companyName.classList.add("company_name");
        companyName.innerText = `${userCompany.name}`;

        const separator     = document.createElement("h4");
        separator.classList.add("separator");
        separator.innerText = "-";

        const departmentName = document.createElement("h4");
        departmentName.classList.add("departament_name");
        departmentName.innerText = `${userCompany.departments.name}`;

        companyHeader.append(companyName, separator, departmentName);
        
    } else {
        companyContainer.innerText = "";
    }
    companyContainer.append(companyHeader);
}

async function renderCoWorkers(){
    const coWorkers = [...await getAllCoworkers()];
    const coWorkersContainer = document.querySelector(".coworkers-list");
    coWorkersContainer.innerText = ""

    if(coWorkers.length > 0){
        coWorkers.forEach(worker =>{
            const workerContainer = document.createElement("li");
            workerContainer.classList.add("coworker");

            const workerName = document.createElement("p");
            workerName.classList.add("coworker_name");
            worker.innerText = worker.username;

            const workerProfLevel = document.createElement("p");
            workerProfLevel.classList.add("coworker_Prof_level");
            worker.innerText = worker.professional_level;

            workerContainer.append(workerName, workerProfLevel);
            coWorkersContainer.append(workerContainer);
        })  
        console.log("Deu pau")
    } else {
        const alert = document.createElement("h4");
        alert.innerText = "Time em formação!";

        coWorkersContainer.append(alert);
    }
}

export {renderProfile, renderCoWorkers, renderCompany}