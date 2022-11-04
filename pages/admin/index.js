import {toHome} from "../../scripts/changeWindow.js"
import {verifyLogin} from "../../scripts/login.js";
import {modalAlert, openModal} from "../../scripts/modal.js";
import {generateDepartment, editDepartment, openDepartment, deleteDepartmentForm, openEditUser, openDeleteUser} from "../../scripts/forms.js"
import {getAllCompanies, getAllDepartments, filterDepartment, getAllUsers, deleteUserAdmin, editUserAdmin} from "../../scripts/requests.js";
verifyLogin();

async function populateSelect(){
    const companiesList = [...await getAllCompanies()];
    const select = document.querySelector("select");

    companiesList.forEach(companie => {
        const option = document.createElement("option");
        option.value = companie.uuid;
        option.innerText = companie.name;

        select.append(option);
    });  
}

async function renderDepartments(companies){
    const departmentsContainer = document.querySelector(".departments-list");
    departmentsContainer.innerHTML = "";

    companies.forEach((department) => {
        const departmentBox = document.createElement("li");
        departmentBox.classList.add("department");

        const departmentTitle = document.createElement("h5");
        departmentTitle.classList.add("department_name");
        departmentTitle.innerText = `${department.name}`;

        const departmentDesc = document.createElement("p");
        departmentDesc.classList.add("department_description");
        departmentDesc.innerText = `${department.description}`;

        const companyName = document.createElement("p");
        companyName.classList.add("companie_section");
        companyName.innerText = `${department.companies.name}`;

        const buttonsContainer = document.createElement("div");
        const imgPEN  = document.createElement("img");
        imgPEN.value  = department.uuid;
        imgPEN.classList.add("edit_button");
        imgPEN.src = "/img/Vector - PEN.png";
        
        imgPEN.addEventListener("click", async ()=>{
            openModal(await editDepartment(department))
        })

        const imgEYE  = document.createElement("img");
        imgEYE.value  = department.uuid;
        imgEYE.classList.add("load_button");
        imgEYE.src = "/img/Vector - Eye.png";

        imgEYE.addEventListener("click", async ()=>{
            openModal(await openDepartment(department))
        })

        const imgTRASH  = document.createElement("img");
        imgTRASH.value  = department.uuid;
        imgTRASH.classList.add("delete_button");
        imgTRASH.src = "/img/Vector - Trash.png";

        imgTRASH.addEventListener("click", async ()=>{
            openModal(await deleteDepartmentForm(department))
        })

        buttonsContainer.append(imgPEN, imgEYE, imgTRASH);
        departmentBox.append(departmentTitle, departmentDesc, companyName, buttonsContainer);
        departmentsContainer.append(departmentBox);
    });
}

async function renderFiltered(){
    await populateSelect();
    const selectFilter = document.getElementById("selectCompanie");
    
    selectFilter.addEventListener("change", async ()=>{
        const selectedCompanie = selectFilter.value;
        
        if(selectedCompanie === "default"){
            renderDefault();
        } else {
            const companie = await filterDepartment(selectedCompanie);
            renderDepartments(companie);  
        }
    })
}

async function renderUsuaries(){
    const usersList = document.querySelector(".users-list");
    const allUsers = [...await getAllUsers()];

    allUsers.forEach(user => {
        const  userContainer = document.createElement("li");
        userContainer.classList.add("user");

        const  userName = document.createElement("h5");
        userName.classList.add("user_name");
        userName.innerText = user.username;

        const  userLevel= document.createElement("p");
        userLevel.classList.add("user_professional_level");
        userLevel.innerText = user.professional_level;

        const  styleWork = document.createElement("p");
        styleWork.classList.add("style_work");
        styleWork.innerText = user.kind_of_work;
 
        const divImg = document.createElement("div");
        const editUser = document.createElement("img")
        editUser.src = "/img/Vector - PEN.png"

        editUser.addEventListener("click", ()=>{
            openModal(openEditUser(user.uuid));
        })

        const deleteUser = document.createElement("img");
        deleteUser.src = "/img/Vector - Trash.png"

        deleteUser.addEventListener("click", ()=>{
            openModal(openDeleteUser(user));
        })
        divImg.append(editUser,deleteUser);
        userContainer.append(styleWork, userName, userLevel, divImg);
        usersList.append(userContainer);
    });
}

async function renderDefault(){
    const allDepartments = await getAllDepartments();
    renderDepartments(allDepartments);
}

function openCreate(){

    const createButton = document.getElementById("createDepartment");

    createButton.addEventListener("click",  async ()=>{
        openModal(await generateDepartment());
    })
}

renderDefault();
renderUsuaries();
renderFiltered();

openCreate();

toHome();

export {renderDepartments}
