function fetchCharacter() {
    let url = window.location.search;
    let slug = new URLSearchParams(url).get("slug");
    return fetch("https://hp-api.lainocs.fr/characters/" + slug).then(
        (response) => response.json()
    );
}

async function displayCharacter() {
    const data = await fetchCharacter();
    document.querySelector("#character").innerHTML = `
    <img src="${data.image}" alt="${data.name}" id="img">
    <div id="informations">
        <div id="blason">   </div> 
        <div id="texteDiv">
            <h1 id="texte">Character:   ${data.name}
            <p id="house">House:   ${data.house}</p>
            <p>Actor:   ${data.actor}</p>
            <a href="characters.html" id="backBtn">Back</a>
        </div>
    `;
    if (data.house == "Gryffindor") {
        document.querySelector("#blason").classList.add("gryffondor");
        document.querySelector("#img").classList.add("gryffClr");
    } else if (data.house == "Slytherin") {
        document.querySelector("#blason").classList.add("serpentard");
        document.querySelector("#img").classList.add("serpClr");
    } else if (data.house == "Hufflepuff") {
        document.querySelector("#blason").classList.add("poufsouffle");
        document.querySelector("#img").classList.add("poufClr");
    } else if (data.house == "Ravenclaw") {
        document.querySelector("#blason").classList.add("serdaigle");
        document.querySelector("#img").classList.add("serdClr");
    } else {
        document.querySelector("#blason").classList.add("unaffiliated");
        document.querySelector("#img").classList.add("unaffClr");
        document.querySelector("#house").innerHTML += `Unaffiliated`;
    }

    function maisonActuelle(h) {
        console.log(h);
        fetch("http://192.168.162.58:3000/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ house: h }),
        })
            .then((r) => r.json())
            .then((r) => console.log(r))
            .catch((e) => console.log(e));
        console.log(h);
    }
    maisonActuelle(data.house);
}
displayCharacter();
