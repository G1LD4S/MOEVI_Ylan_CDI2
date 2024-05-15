let caseEmail = document.getElementById("email");
let caseName = document.getElementById("name");

const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
    ) {
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    }

    const data = await response.json();

    caseEmail.innerHTML += data.email;
    caseName.innerHTML += data.name;
};

getMyProfile();
