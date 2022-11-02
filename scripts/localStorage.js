function setLocalStorage(){
    const user = localStorage.getItem("user")
    || ""

    return user;
}

export {setLocalStorage}
