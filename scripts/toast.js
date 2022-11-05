function toastAlert(title, type, content){
    const body = document.querySelector("body");

    const toastContainer = document.createElement("div");
    toastContainer.classList.add(`toast-${type}-container`);

    const toastTitle = document.createElement("h3");
    toastTitle.classList.add("toast_title");
    toastTitle.innerText = title;  
    
    const toastContent  = document.createElement("p");
    toastContent.classList.add("toast_content");
    toastContent.innerText = content;

    toastContainer.append(toastTitle, toastContent);
    body.append(toastContainer);
}

export {toastAlert}