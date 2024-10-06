
const url = "http://127.0.0.1:5501/html/index.html";
const divIconItens = document.querySelector(".headerItens > div:nth-child(2");
const sliderItens = document.querySelectorAll(".trainingSection > *");
const buttons = divIconItens.querySelectorAll("button");
const menu = document.querySelector("#menu > ul");
const contactImg = document.querySelector(".contact > section");
const scrollImg = document.querySelector(".upArrow > img");
const loginForm = document.querySelector(".logInForm");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


let paragraphsData = null;
let userData = null;

function scrollPageUp() {
    scrollImg.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function showContactNumber() {
    const contactNumber = document.createElement("p");
    contactNumber.textContent = "919 204 462";
    contactNumber.style.display = "none";
    contactNumber.style.color = "#0acb84";
    contactNumber.style.fontSize = "12px";
    contactImg.appendChild(contactNumber);

    contactImg.addEventListener("mouseover", function () {
        contactNumber.style.display = "block";
    });
    contactImg.addEventListener("mouseout", function () {
        contactNumber.style.display = "none";
    });
}

function getUserData() {
    return fetch("../Data/Users.json")
    .then(response => response.json())
    .then(data => {
        userData = data;
        console.log(userData);
    })
    .catch(error => console.log("Error: ", error));
}

function getParagraphsData() {
    return fetch("../Data/Paragraphs.json")
    .then(response => response.json())
    .then(data => {
        paragraphsData = data;
    })
    .catch(error => console.log("Error: ", error));
}

function setSliderItens() {
    if (!paragraphsData) {
        console.log("Paragraphs not loaded yet");
        return;
    }

    const section = document.querySelector(".trainingSection");

    for (let i = 0; i < 5; i++) {
        const divSlide = document.createElement("div");
        divSlide.className = "slide";
        divSlide.innerHTML =  
        `<img class="trainingImg" src="/img/slider${i+1}.jpg" alt="">
        <p class="trainingTitle trainingTitle${i+1}">${paragraphsData.paragraphs[i].title}</p>
        <p class="trainingSubtitle trainingSubtitle${i+1}">${paragraphsData.paragraphs[i].subtitle}</p>
        <p class="trainingText trainingText${i+1}">${paragraphsData.paragraphs[i].text}</p>`;
        section.appendChild(divSlide);
    } 
}

function showSliderItens() {
    getParagraphsData().then(() => {
        setSliderItens(); 
    })
    .catch(error => console.log("Paragraph data not loaded: ", error));
}

function showLoggedIcons() { 
    const user = userData.users.find(user => user.email.trim() === emailInput.value.trim() && user.senha.trim() === passwordInput.value.trim());
    if (user !== null) {
        buttons[1].innerHTML = `<i class="fa-regular fa-user" title="Perfil"></i>`;
        buttons[1].id = "perfil";
        buttons[1].title = "Perfil";
        buttons[2].innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket" title="Logout"></i>`;
        buttons[2].id = "logoutIcon";
        buttons[2].title = "Logout";

        logOutUser();
    }
}

function showIcons() { 
    buttons[1].innerHTML = `<i class="fa-solid fa-user-plus"></i>`;
    buttons[1].id = "registerIcon";
    buttons[1].title = "Registo";
    buttons[2].innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i>`;
    buttons[2].id = "loginIcon";
    buttons[2].title = "Login";
    
    let userMessage = document.querySelector(".divItens > p");
    if (userMessage) {
        userMessage.remove();
    }
}

function showMenu () {
    buttons[3].addEventListener("click", function () {
        if (menu.style.display === "none" || menu.style.display === "") {
            menu.style.display = "flex";
        } else if (menu.style.display === "flex") {
            menu.style.display = "none"
        }
    });
}

function showLogInModal() {
    divIconItens.addEventListener("click", function(event) {
        if (event.target.closest("#loginIcon")) {
            document.querySelector(".modalLogIn").style.display = "block";
            document.querySelector(".logInForm").style.display = "block";
            document.querySelector("#email > input").focus();
            document.body.style.overflow = "hidden";
        }
    });
}

function hideLogInModal() {
    let closeButoon = document.querySelector("#closeButton");
    closeButoon.addEventListener("click", function () {
        document.querySelector(".modalLogIn").style.display = "none";
        document.querySelector(".logInForm").style.display = "none";
        document.body.style.overflow = "";

        let existingMessage = document.querySelector(".fillMessage");
        if (existingMessage) {
            existingMessage.remove();
        }
        document.querySelector("#emailInput").value = "";
        document.querySelector("#passwordInput").value = "";
    });
}

function showLoginMessages() {
    getUserData().then(() => {
        let validationButton = document.querySelector("#validationButton");
        let emailInput = document.querySelector("#emailInput");
        let passwordInput = document.querySelector("#passwordInput");
        let loginHeader = document.querySelector("#loginHeader");
        
        
        validationButton.addEventListener("click", function () {
            
            let existingMessage = document.querySelector(".fillMessage");
            if (existingMessage) {
                existingMessage.remove();
            }
    
            let fillMessage = document.createElement("p");
            fillMessage.className = "fillMessage";
            fillMessage.style.fontSize = "10px";
    
            let isValid = true;
    
            if (emailInput.value === "" || passwordInput.value === "") {
                fillMessage.textContent = "Os dois campos são de preenchimento obrigatório!";
                loginHeader.insertAdjacentElement("afterend", fillMessage);
                isValid = false;
            } else if (emailInput.value !== "" && !emailRegex.test(emailInput.value.trim())) {
                fillMessage.textContent = "O e-mail tem um formato incorrecto!";
                loginHeader.insertAdjacentElement("afterend", fillMessage);
                isValid = false;
            } else if (isValid && userData) {
                const user = userData.users.find(user => user.email.trim() === emailInput.value.trim() && user.senha.trim() === passwordInput.value.trim());
                console.log(user);
                if (!user) {
                    fillMessage.textContent = "Utilizador inexistente!";
                    loginHeader.insertAdjacentElement("afterend", fillMessage);
                    isValid = false;
                } else if (user.activa !== "sim") {
                    fillMessage.textContent = "Conta não activa!";
                    loginHeader.insertAdjacentElement("afterend", fillMessage);
                    isValid = false;
                }
            } 
            if (isValid) {
                logInUser();
            }
        });
    })
    .catch(error => console.log("Paragraph data not loaded: ", error));
    
}

function logInUser() {
    
    const user = userData.users.find(user => user.email.trim() === emailInput.value.trim() && user.senha.trim() === passwordInput.value.trim());

    sessionStorage.setItem('loggedInUserId', user.id);

    showLoggedIcons();
    let userMessage = document.createElement("p");
    userMessage.style.fontSize = "12px";
    userMessage.textContent = `Bem-vindo(a), ${user.nome}`;
    userMessage.className = "user-welcome-message";  // Add this line
    let divItens = document.querySelector(".divItens > form");
    divItens.insertAdjacentElement("beforebegin", userMessage);

    document.querySelector(".modalLogIn").style.display = "none";
    document.querySelector(".logInForm").style.display = "none";
    document.body.style.overflow = "";
}

function logOutUser() {
    divIconItens.addEventListener("click", function(event) {
        if (event.target.closest("#logoutIcon")) {

            sessionStorage.clear();

            console.log(sessionStorage);
            showIcons();
            let userMessage = document.querySelector(".divItens > p");
            if (userMessage) {
                userMessage.remove();
            }
        }
    });
}

function showSearchTextInput() {
    let form = divIconItens.querySelector("form");
    let searchIcon = document.querySelector("#searchIcon");
    let input = divIconItens.querySelector("input");

    searchIcon.addEventListener("click", function () {
        
        input.style.border = "none";

        if (window.innerWidth > 940) {
            if (form.style.width === "0px" || form.style.width === "") {
                form.style.display = "flex";
                setTimeout(() => {
                    form.style.width = "300px";
                }, 10); // same as 0.01 seconds in miliseconds
            } else {
                form.style.width = "0px";
                setTimeout(() => {
                    form.style.display = "none";
                }, 500); // same as 0.5 seconds in miliseconds
            }
        } else {
            if (form.style.width === "0px" || form.style.width === "") {
                form.style.display = "flex";
                setTimeout(() => {
                    form.style.maxWidth = "300px";
                    form.style.width = "100%";
                }, 10)
                
            } else {
                form.style.width = "0px";
                setTimeout(() => {
                    form.style.display = "none";
                }, 500);
            }
        }
    });

    form.addEventListener("transitionend", function(event) {
        if (event.propertyName === "width" && (form.style.width === "300px" || form.style.width === "100%")) {
            input.style.border = "solid 1px #aaa";
            input.focus();
        } else {
            input.style.border = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!form.contains(event.target) && !searchIcon.contains(event.target)) {
            if (form.style.width === "300px" || form.style.width === "100%") {
                
                form.style.width = "0px";
                
                setTimeout(() => {
                    form.style.display = "none";
                }, 500);
            }
        }
    })
}


document.addEventListener('DOMContentLoaded', showMenu);
document.addEventListener('DOMContentLoaded', showLogInModal);
document.addEventListener('DOMContentLoaded', hideLogInModal);
document.addEventListener('DOMContentLoaded', showLoginMessages);
document.addEventListener('DOMContentLoaded', showContactNumber);
document.addEventListener('DOMContentLoaded', scrollPageUp);
document.addEventListener('DOMContentLoaded', showSearchTextInput);
document.addEventListener('DOMContentLoaded', showSliderItens);

