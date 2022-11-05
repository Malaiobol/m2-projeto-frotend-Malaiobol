import {verifyUser} from "../../scripts/requests.js";
import {logOut} from "../../scripts/login.js";
import {renderFiltered, renderUsuaries, populateSelect, openCreate, renderDefault} from "../../scripts/Admin/renderAdmin.js"
import {getLocalStorage} from "../../scripts/localStorage.js";

async function verifyLogin(){
    const token = getLocalStorage();
    const userLogged = await verifyUser(token);

    if(userLogged === false){
        window.location.replace("/pages/user/index.html");
    }
}


renderDefault()
renderFiltered();
renderUsuaries();
populateSelect();
openCreate();
verifyUser();
verifyLogin();
logOut();