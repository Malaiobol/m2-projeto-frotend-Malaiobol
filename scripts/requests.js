import {modal} from "./modal.js";

const baseURL = "http://localhost:6278/";

async function loginRequest(body){
    try{
        const request = await fetch(baseURL + "auth/login",  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            const response = await request.json()
            localStorage.setItem("user", response.token);
            modal("Sucesso!", "Login feito com sucesso!")
            setTimeout( 
                window.location.replace("/pages/post/index.html"),4000
            )  
        }
    } catch(err){
        console.log("Não foi possível concluir sua requisição")
        console.log(err)
    }
}

async function registerRequest(body){
    try{
        const request = await fetch(baseURL + "auth/register", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            setTimeout(()=>{
                window.location.replace("/pages/login/index.html")
            }, 4000)
            console.log("Sucesso");
        }
    }catch(err){
        console.log(err);
    }
}

async function getAllCompanies(){
    try{
        const request = await fetch(baseURL + "companies", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        const response = await request.json();
        return response
    }catch(err){
        console.log("voce errou algo, burro!")
        console.log(err)
    }
}

async function filterCompanie(section){
    try{
        const request = await fetch(baseURL + "companies/" + `${section}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log("errou algo, burro!")
        console.log(err)
    }
}

export {loginRequest, registerRequest, getAllCompanies, filterCompanie}