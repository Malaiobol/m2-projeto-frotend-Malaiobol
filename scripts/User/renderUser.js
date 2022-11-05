import { 
    getUserInfo, getUserDepartment, getAllCoworkers
} from "../../scripts/User/requestsUser.js"

async function renderProfile(){
    const userStack = await getUserInfo();
    const userName = document.querySelector(".user_name");
    userName.innerText = userStack.username;

    const userEmail = document.querySelector(".user_email");
    userEmail.innerText = userStack.email;

    const userProfLevel = document.querySelector(".user_professional_level");
    userProfLevel.innerText = userStack.professional_level;

    const userPreference = document.querySelector(".user_preference");
    if(userStack.kind_of_work !== null){
        userPreference.innerText = userStack.kind_of_work;
    } else {
        userPreference.innerText = "Ainda não possui modalidade de trabalho";
    }
}

async function renderCompany(){
    const userCompany = await getUserDepartment();

    const companyName  = document.querySelector(".company_name");
    companyName.innerText = userCompany.name;

    const separator     = document.querySelector(".separator");
    separator.innerText = "-";

    const departmentName = document.querySelector(".departament_name");

    const department = userCompany.departments;
    department.forEach(elem =>{
        departmentName.innerText = elem.name;   
    });
}

async function renderCoWorkers(){
    const coWorkers = await getAllCoworkers();
    const coWorkersContainer = document.querySelector(".coworkers-list");
    coWorkersContainer.innerText = ""

    if(coWorkers.length > 0){
        coWorkers.forEach(worker =>{
            const workerPog = worker.users;
            workerPog.forEach(ele =>{
                let workerContainer = document.createElement("li");
                workerContainer.classList.add("coworker");

                let workerName = document.createElement("p");
                workerName.classList.add("coworker_name");
                workerName.innerText = ele.username;

                let workerProfLevel = document.createElement("p");
                workerProfLevel.classList.add("coworker_prof_level");
                workerProfLevel.innerText = ele.professional_level;

                workerContainer.append(workerName, workerProfLevel);
                coWorkersContainer.append(workerContainer);
            });
        })  
    } else {
        const alert = document.createElement("h4");
        alert.innerText = "Time em formação!";
        alert.classList.add("alert_message");
        coWorkersContainer.append(alert);
    }
}

export {renderProfile, renderCoWorkers, renderCompany}