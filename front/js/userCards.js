const token = localStorage.getItem("token");
let allCards;

async function fetchAllCards() {
    try {
        const response = await fetch("https://hp-api.lainocs.fr/characters");
        allCards = await response.json();
    } catch (error) {
        alert(error.message);
    }
}

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
            const { cards, total } = await response.json();
            displayCards(cards, total);
            return;
        }
    } catch (error) {
        alert(error.message);
    }
}

async function displayCards(relations, total) {
    const boxCards = document.querySelector("#cardsOwned");

    relations.forEach((relation) => {
        const card = allCards.find((card) => card.id === relation.cardId);

        const cardEl = document.createElement("a");
        cardEl.href = `single-hp.html?slug=${card.slug}`;
        cardEl.classList.add("card");
        cardEl.setAttribute("data-house", `${card.house.toLowerCase()}`);
        cardEl.setAttribute("data-name", `${card.name}`);

        cardEl.innerHTML = `
            <div class="character">
                <h2 class="character_name">${card.name}</h2>
                <img src="${card.image}" alt="${card.name}" class="character_image">
                <span class="card_quantity">${relation.quantity}</span>
            </div>
        `;
        // relation.quantity

        boxCards.appendChild(cardEl);
    });
}

// IIFE : Immediately Invoked Fonction Expression
(async () => {
    await fetchAllCards();
    await fetchCards();
})();

//                                            Filters

//                                      Filters

const filterSpinning = [
    { transform: "rotate(0)" },
    { transform: "rotate(10deg)" },
    { transform: "rotate(-10deg)" },
    { transform: "rotate(0)" },
];

const filterTiming = {
    duration: 1000,
    iterations: 1,
};

document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.matches(".filterBtn")) {
        const isActive = document.querySelector(".filterBtn.active");

        if (isActive && isActive !== target) {
            // On rend actif le filtre
            isActive.classList.remove("active");
            target.classList.add("active");
            target.animate(filterSpinning, filterTiming);

            // On récupère la maison
            const filter = target.getAttribute("data-filter").toLowerCase();
            console.log(filter);
            const everyCards = document.querySelectorAll(".card");

            if (filter.toLowerCase() === "all") {
                everyCards.forEach((card) => {
                    card.classList.remove("hidden");
                });
            } else if (filter.toLowerCase() === "none") {
                everyCards.forEach((card) => {
                    if (card.getAttribute("data-house").toLowerCase() === "") {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            } else {
                everyCards.forEach((card) => {
                    if (
                        card.getAttribute("data-house").toLowerCase() === filter
                    ) {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            }
        }
    } else if (target.matches(".carte")) {
        const slug = target.getAttribute("slug");
        window.location.href = "carte.html?slug=" + slug;
    }
});

const searchBar = document.getElementById("searchBar");

// Function for the search input.
searchBar.addEventListener("input", (e) => {
    // Put all the cards hidden
    const everyCards = document.querySelectorAll(".card");
    everyCards.forEach((card) => {
        card.classList.add("hidden");
    });

    // then get the search value in lowercase to use it for the filter (we remove the whites spaces too)
    const searchValue = e.target.value.toLowerCase().replace(/\s/g, "");

    // if not empty, let's filter !
    if (searchValue) {
        let newArray = allCards.filter((perso) =>
            perso.name
                .toLowerCase()
                .replace(/\s/g, "")
                .startsWith(searchValue.toLowerCase())
        );

        // looking for the card
        if (newArray.length > 0) {
            for (let card = 0; card < newArray.length; card++) {
                const cardFiltered = document.querySelector(
                    `[data-name="${newArray[card].name}"]`
                );
                cardFiltered?.classList.remove("hidden");
            }
        }

        // if the search value is empty, put all cards visible.
    } else {
        everyCards.forEach((card) => {
            card.classList.remove("hidden");
        });
    }
});
