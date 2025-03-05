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
