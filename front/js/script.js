const formulaire = document.getElementById("formulaire");

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (document.querySelector("input[name='inscription']")) {
        await inscription();
    } else {
        await connexion();
    }

    return;
});

async function connexion() {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);
            window.location.href = "profil.html";
        }
    } catch (error) {
        alert(error.message);
    }
}

async function inscription() {
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const name = document.getElementById("name").value;

        const response = await fetch("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);
            window.location.href = "profil.html";
        }
    } catch (error) {
        alert(error.message);
    }
}
