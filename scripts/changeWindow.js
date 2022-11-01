function toLogin(){
    const loginButton = document.querySelector(".login_button");
    
    loginButton.addEventListener("click", (e)=>{
        e.preventDefault();
        window.location.replace("/pages/login/index.html")
    })
}

function toRegister(){
    const registerButton = document.querySelector(".register_button");

    registerButton.addEventListener("click", (e)=>{
        e.preventDefault();
        window.location.replace("/pages/register/index.html")
    })
}

function toHome(){
    const returnButton = document.querySelector(".return_button");

    returnButton.addEventListener("click", ()=>{
        window.location.replace("/pages/index.html");
    })
}

export { toLogin, toRegister, toHome,};