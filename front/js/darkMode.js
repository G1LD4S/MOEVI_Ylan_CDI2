const darkmodeBtn = document.getElementById("darkmodeBtn");
darkmodeBtn.addEventListener("click", DarkmodeToggle);

function DarkmodeToggle() {
    const element = document.body;
    element.classList.toggle("darkMode");
}
