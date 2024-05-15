const connexionbtn = document.getElementById("Connexion");
// const token = localStorage.getItem("token");

const redirection = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return (window.location.href = "connexion.html");
    }

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    console.log(data);
};
connexionbtn.addEventListener("click", function () {
    redirection();
});
