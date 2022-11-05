import {toastAlert} from "./toast.js";
const baseURL = "http://localhost:6278/";

async function verifyUser(token){
    try{
        const request = await fetch(baseURL + "auth/validate_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const response = await request.json();
        return response.is_admin;
    }catch(err){
        console.log(err)
    }
}

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

            if(await verifyUser(response.token) === false){   
                localStorage.setItem("user", response.token);
                toastAlert("Sucesso!", "sucess", "Login feito com sucesso!");
                setTimeout(()=>{window.location.replace("/pages/user/index.html")},4000);
            } else{
                localStorage.setItem("user", response.token);
                toastAlert("Sucesso!", "sucess", "Login como ADM feito com sucesso!");
                setTimeout(()=>{window.location.replace("/pages/admin/index.html")},4000);
            }
            
        }
    } catch(err){
        console.log("Não foi possível concluir sua requisição", err)
    }
}

async function registerRequest(body){
    try{
        console.log(body);
        const request = await fetch(baseURL + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        if(request.ok){
            toastAlert("Sucesso!", "sucess", "Cadastro realizado com sucesso!");
            setTimeout(()=>{window.location.replace("/pages/login/index.html")},4000);
        } else {
            toastAlert("Erro!", "error", "Algo deu errado, tente novamente");
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
        console.log("voce errou algo, burro!", err)
    }
}

async function filterCompanie(section){
    try{
        const request = await fetch(baseURL + "companies/" + `${section}`,{
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        const response = await request.json();
        return response;
    }catch(err){
        console.log("errou algo, burro!", err)
    }

}

export {loginRequest, verifyUser, registerRequest, getAllCompanies, filterCompanie};