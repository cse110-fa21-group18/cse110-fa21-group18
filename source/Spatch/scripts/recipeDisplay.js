const bookmarkButton = document.querySelector("#bookmark");

bookmarkButton.addEventListener("click", (e) => {
    if(e.target.getAttribute("src") == "./Assets-images/bookmark_empty.svg") {
        e.target.src = "./Assets-images/bookmark_filled.svg";
    }
    else {
        e.target.src = "./Assets-images/bookmark_empty.svg";
    }
});