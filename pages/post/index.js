import {verifyLogin} from "../../scripts/login.js"
import {toHome} from "../../scripts/changeWindow.js"
import {renderProfile, renderCompany, renderCoWorkers} from "../../scripts/renderUser.js"
import {openModal} from "../../scripts/modal.js";
import {editUser} from "../../scripts/forms.js"

function editUserProfile(){
    const editImg = document.querySelector(".edit_profile");

    editImg.addEventListener("click", async ()=>{
        openModal(await editUser())
    })
}



verifyLogin();
toHome();
renderProfile();
renderCompany();
renderCoWorkers(); 
editUserProfile();