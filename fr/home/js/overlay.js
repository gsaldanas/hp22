const overlay = document.getElementById("my_overlay");
const menu = document.getElementById("my_menu");
const hamburger = document.getElementById("my_hamburger");
/*OVERLAY FUNCTIONS */
function myHamburger() {
    hamburger.classList.toggle("change");
}
function openOverlay() {
    overlay.style.height = "90%";
    hamburger.classList.toggle("change");
    hamburger.removeEventListener("click", openOverlay);
    hamburger.addEventListener("click", closeOverlay);
    }
function closeOverlay() {
    overlay.style.height = "0";
    overlay.classList.remove("change");
    overlay.classList.add('hamburger');
    hamburger.removeEventListener("click", closeOverlay);
    hamburger.addEventListener("click", openOverlay);
}
