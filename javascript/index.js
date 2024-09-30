const url = "http://127.0.0.1:5501/html/index.html";
const iconsDiv = document.querySelector(".headerItens > div:nth-child(2");

function showLoggedIcons() {
    const buttons = iconsDiv.querySelectorAll("button"); 
    buttons[1].innerHTML = `<i class="fa-regular fa-user" title="Perfil"></i>`;
    buttons[2].innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket" title="Logout"></i>`;
}

function showSearchTextInput() {
    let form = iconsDiv.querySelector("form");
    let searchIcon = document.querySelector("#searchIcon");
    let input = iconsDiv.querySelector("input");

    searchIcon.addEventListener("click", function () {
        
        input.style.border = "none";

        if (form.style.width === "0px" || form.style.width === "") {
            form.style.display = "flex";
            setTimeout(() => {
                form.style.width = "300px";
            }, 10);
        } else {
            form.style.width = "0px";
            setTimeout(() => {
                form.style.display = "none";
            }, 500);
        }
    });

    form.addEventListener("transitionend", function(event) {
        if (event.propertyName === "width" && form.style.width === "300px") {
            input.style.border = "solid 1px #aaa";
        } else {
            input.style.border = "none";
        }
    })
}


showSearchTextInput();
//showLoggedIcons();