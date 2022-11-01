
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

            localStorage.setItem("user", response.token)
            window.location.replace("/pages/post/index.html")
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

export {loginRequest, registerRequest}