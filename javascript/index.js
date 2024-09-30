const url = "http://127.0.0.1:5501/html/index.html";

function showLoggedIcons() {
    const iconsDiv = document.querySelector(".headerItens > div:nth-child(2");
    
    iconsDiv.innerHTML = 
    `<i class="fa-solid fa-magnifying-glass" title="Pesquisa"></i>
    <i class="fa-regular fa-user" title="Perfil"></i>
    <i class="fa-solid fa-arrow-right-from-bracket" title="Logout"></i>`;
}


//showLoggedIcons();