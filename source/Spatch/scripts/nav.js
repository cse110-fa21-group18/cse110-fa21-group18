const menuBtn = document.getElementById("menu-btn");
const sidebar = document.querySelector(".sidebar");

var path = window.location.pathname;
var page = path.split("/").pop();

menuBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("active");
});