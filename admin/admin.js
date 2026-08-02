<<<<<<< HEAD

function openPage(page){


document.getElementById("title").innerHTML =
page.charAt(0).toUpperCase()+page.slice(1);



}



function logout(){

localStorage.removeItem("admin");

window.location.href="index.html";

}




if(
window.location.pathname.includes("dashboard")
){

if(localStorage.getItem("admin") !== "true"){

window.location.href="index.html";

}

=======

function openPage(page){


document.getElementById("title").innerHTML =
page.charAt(0).toUpperCase()+page.slice(1);



}



function logout(){

localStorage.removeItem("admin");

window.location.href="index.html";

}




if(
window.location.pathname.includes("dashboard")
){

if(localStorage.getItem("admin") !== "true"){

window.location.href="index.html";

}

>>>>>>> 376630f8cc9561add2abd3463d9dde4049b5fb7a
}