import {editModal} from "../../scripts/modal.js"
import {getUserInfo} from "../../scripts/requests.js"

function editProfile(){
    const editButton = document.querySelector(".edit_profile");
    const backgroundModal = document.querySelector(".modal-background");

    editButton.addEventListener("click", ()=>{
        editModal();
    })
}

async function renderProfile(){
    const userStack = await getUserInfo();

    const userName = document.querySelector(".user_name");
    userName.innerText = userStack.username;

    const userEmail = document.querySelector(".user_email");
    userEmail.innerText = userStack.email;

    const userProfLevel = document.querySelector(".user_professional_level");
    userProfLevel.innerText = userStack.professional_level

    // const userPreference = document.querySelector(".user_preference");
    // userPreference
}

async function renderComp(){
    
}

renderProfile();
editProfile();