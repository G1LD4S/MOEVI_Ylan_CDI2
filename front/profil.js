let caseEmail = document.getElementById("email");
let caseName = document.getElementById("name");

const getMyProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/getMyProfile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    caseEmail.innerHTML += data.email;
    caseName.innerHTML += data.name;
};

getMyProfile();
