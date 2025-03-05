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
    const pokemonInfo = document.getElementById("randomPokemons");

    // Crear la nueva tarjeta de Pokémon
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");
    pokemonCard.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        <p>Tipos: ${pokemon.types.map(type => type.type.name).join(", ")}</p>
    `;

    // Insertar la tarjeta al principio
    pokemonInfo.insertBefore(pokemonCard, pokemonInfo.firstChild);
}

// Función para obtener Pokémon aleatorios (solo al cargar la página)
function fetchRandomPokemons() {
    const randomPokemonPromises = [];
    for (let i = 0; i < 12; i++) {  // Obtener 12 Pokémon aleatorios
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
