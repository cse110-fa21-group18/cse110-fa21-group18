/*
Function that toggles between showing filter options
*/
function toggleFilter(){
  let filterPopUp = document.getElementById('showpop');
  filterPopUp.classList.toggle('show');
}
 
/*
Event listener to submit request once submit is hit for search
*/
let searchInput = document.getElementById('searchInput')
let filterPopUp = document.getElementById('showpop');
searchInput.addEventListener('keypress', function (keyBoardEvent) {
  if (keyBoardEvent.key === 'Enter') {
    console.log(searchInput.value);
    alert("recipes will pop up")
  }
});

