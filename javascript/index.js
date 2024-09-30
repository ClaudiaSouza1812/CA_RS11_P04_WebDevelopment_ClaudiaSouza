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

    searchIcon.addEventListener("click", function () {

        form.style.transition = "width 0.5s ease";

        if (form.style.width === "0px" || form.style.width === "") {
            form.style.display = "flex";
            form.style.width = "300px";
        } else {
            form.style.width = "0px";
            setDisplayTransition(() => {
                form.style.display = "none";
            }, 500);
        }
    });
}


showSearchTextInput();
//showLoggedIcons();