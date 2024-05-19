const boosterBtn = document.getElementById("boosterBtn");
const token = localStorage.getItem("token");

boosterBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("/user/booster/open", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401 || response.status === 403) {
            alert("Problème d'authentification.");
            localStorage.removeItem("token");
            window.location.href = "connexion.html";
        }

        if (response.ok) {
            const { boosterCards } = await response.json();
            displayCardsWindow(boosterCards);
        }
    } catch (error) {
        alert(error.message);
    }
});

function displayCardsWindow(cards) {
    // Faire une boucle dans cards pour créer chaque carte
    const boxCards = document.querySelector("#newCards");
    console.log(cards);
    cards.forEach((card) => {
        const cardEl = document.createElement("div");
        cardEl.classList.add("boosterCard");

        cardEl.innerHTML = `
            <div class="character">
                <h2 class="character_name">${card.name}</h2>
                <img src="${card.image}" alt="${card.name}" class="character_image">
            </div>
        `;

        boxCards.appendChild(cardEl);
    });
    return;
}
