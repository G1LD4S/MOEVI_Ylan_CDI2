const token = localStorage.getItem("token");
let dataArray = [];

async function fetchCards() {
    try {
        const response = await fetch("/user/cards", {
            method: "GET",
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
            dataArray = await response.json();
            console.log(dataArray);
            return dataArray;
        }
    } catch (error) {
        alert(error.message);
    }
}

/* async function displayCards() {
    const data = await fetchCards();
    const boxCards = document.querySelector("#cardsOwned");
    data.forEach((card) => {
        const card = document.createElement("a");
        card.href = `single-hp.html?slug=${character.slug}`;
        card.classList.add("card");
        card.setAttribute("data-house", `${character.house.toLowerCase()}`);
        card.setAttribute("data-name", `${character.name}`);

        card.innerHTML = `
            <div class="character">
                <h2 class="character_name">${character.name}</h2>
                <img src="${character.image}" alt="${character.name}" class="character_image">
            </div>
        `;

        boxCards.appendChild(card);
    });
}
*/
fetchCards();
