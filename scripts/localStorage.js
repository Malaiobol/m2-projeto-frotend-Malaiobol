function getLocalStorage(){
    const user = localStorage.getItem("user")
    || ""

    return user;
}

export {getLocalStorage}
