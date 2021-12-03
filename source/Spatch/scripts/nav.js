var path = window.location.pathname;
var page = path.split("/").pop();

console.log(page);

fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("#nav-placeholder");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);

    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const otherContent = document.querySelector(".main-content");
    menuBtn.addEventListener("click", ()=>{
        console.log(sidebar);
        sidebar.classList.toggle("active");
        otherContent.classList.toggle("active");
    });
});