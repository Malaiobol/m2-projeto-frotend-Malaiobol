import { verifyUserType, logOut } from "../../scripts/login.js";
import { renderProfile, renderCompany, renderCoWorkers,  } from "../../scripts/User/renderUser.js";
import { editUser } from "../../scripts/User/formsUser.js";
import { openModal } from "../../scripts/modal.js"
import {verifyUser} from "../../scripts/requests.js"
import { getLocalStorage } from "../../scripts/localStorage.js";

function openEditMenu(){
    const editButton = document.querySelector(".edit_profile");

    editButton.addEventListener("click", async ()=>{
       openModal(await editUser());
    })
}

async function verifyLogin(){
    const token = getLocalStorage();
    const userLogged = await verifyUser(token);

    if(userLogged === true){
        window.location.replace("/pages/admin/index.html");
    }
}

openEditMenu();
logOut();
verifyUserType();
verifyLogin();
renderProfile();
renderCompany();
renderCoWorkers();