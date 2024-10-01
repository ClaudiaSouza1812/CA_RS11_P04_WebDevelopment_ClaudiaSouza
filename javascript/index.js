const url = "http://127.0.0.1:5501/html/index.html";
const divIconItens = document.querySelector(".headerItens > div:nth-child(2");

function showLoggedIcons() {
    const buttons = divIconItens.querySelectorAll("button"); 
    buttons[1].innerHTML = `<i class="fa-regular fa-user" title="Perfil"></i>`;
    buttons[2].innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket" title="Logout"></i>`;
}

function showSearchTextInput() {
    let form = divIconItens.querySelector("form");
    let searchIcon = document.querySelector("#searchIcon");
    let input = divIconItens.querySelector("input");

    searchIcon.addEventListener("click", function () {
        
        input.style.border = "none";

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
    });

    form.addEventListener("transitionend", function(event) {
        if (event.propertyName === "width" && form.style.width === "300px") {
            input.style.border = "solid 1px #aaa";
            input.focus();
        } else {
            input.style.border = "none";
        }
    });

    document.addEventListener("click", function (event) {
        if (!form.contains(event.target) && !searchIcon.contains(event.target)) {
            if (form.style.width === "300px") {
                
                form.style.width = "0px";
                
                setTimeout(() => {
                    form.style.display = "none";
                }, 500);
            }
        }
    })
}


showSearchTextInput();
//showLoggedIcons();