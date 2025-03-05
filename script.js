document.getElementById("searchBtn").addEventListener("click", function () {
    const pokemonName = document.getElementById("search").value.toLowerCase();
    if (pokemonName) {
        fetchPokemon(pokemonName);
    }
});

function fetchPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .then(data => displayPokemon(data))
        .catch(error => alert("Pokémon no encontrado"));
}

function displayPokemon(pokemon) {
    const pokemonInfo = document.getElementById("pokemonInfo");
    pokemonInfo.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>Altura: ${pokemon.height / 10} m</p>
        <p>Peso: ${pokemon.weight / 10} kg</p>
        <p>Tipos: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    `;
}

// Función para obtener Pokémon aleatorios
function fetchRandomPokemons() {
    const randomPokemonPromises = [];
    for (let i = 0; i < 3; i++) {
        const randomId = Math.floor(Math.random() * 898) + 1;  // Pokémon 1 a 898
        randomPokemonPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(response => response.json()));
    }

    Promise.all(randomPokemonPromises)
        .then(pokemons => {
            displayRandomPokemons(pokemons);
        })
        .catch(error => console.log("Error al obtener Pokémon aleatorios:", error));
}

// Función para mostrar los Pokémon aleatorios en la interfaz
function displayRandomPokemons(pokemons) {
    const randomPokemonsContainer = document.getElementById("randomPokemons");
    randomPokemonsContainer.innerHTML = '';  // Limpiar la sección

    pokemons.forEach(pokemon => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");
        pokemonCard.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>Tipos: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
        `;
        randomPokemonsContainer.appendChild(pokemonCard);
    });
}

// Cargar Pokémon aleatorios cuando la página se cargue
window.onload = fetchRandomPokemons;
