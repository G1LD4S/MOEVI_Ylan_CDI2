let dataArray = [];

async function fetchCharacters() {
    try {
        const response = await fetch("https://hp-api.lainocs.fr/characters");

        dataArray = await response.json();
        return dataArray;
    } catch (error) {
        alert("An error occured.");
    }
}

async function displayCharacters() {
    const data = await fetchCharacters();
    const boxCards = document.querySelector("#characters");
    data.forEach((character) => {
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
            // On rend actif le filtre + l'animation
            isActive.classList.remove("active");
            target.classList.add("active");
            target.animate(filterSpinning, filterTiming);

            // On récupère la maison
            const filter = target.getAttribute("data-filter").toLowerCase();
            const allCards = document.querySelectorAll(".card");

            if (filter.toLowerCase() === "all") {
                allCards.forEach((card) => {
                    card.classList.remove("hidden");
                });
            } else if (filter.toLowerCase() === "none") {
                allCards.forEach((card) => {
                    if (card.getAttribute("data-house").toLowerCase() === "") {
                        card.classList.remove("hidden");
                    } else {
                        card.classList.add("hidden");
                    }
                });
            } else {
                allCards.forEach((card) => {
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

//                                                  Search bar

const searchBar = document.getElementById("searchBar");

// Function for the search input.
searchBar.addEventListener("input", (e) => {
    // Put all the cards hidden
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.classList.add("hidden");
    });

    // then get the search value in lowercase to use it for the filter (we remove the whites spaces too)
    const searchValue = e.target.value.toLowerCase().replace(/\s/g, "");

    // if not empty, let's filter !
    if (searchValue) {
        let newArray = dataArray.filter((perso) =>
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
        allCards.forEach((card) => {
            card.classList.remove("hidden");
        });
    }
});

displayCharacters();
