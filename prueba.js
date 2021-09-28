const urlpokeapi = 'https://pokeapi.co/api/v2/pokemon/';

var n = 0;


function cantidadPokes(minpoke) {
    fetch(`${urlpokeapi}?offset=${minpoke}&limit=20`)
    .then(res => res.json())
    .then(datapoke => {
        for (let i = 0; i < 20; i++) {
            document.getElementById("mostrarPokemon").innerHTML += `
                <button onclick="modalPokemonInfo('${datapoke.results[i].name}')">
                <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${[i + 1 + minpoke].toString().padStart(3, '0')}.png" alt="${datapoke.results[i].name}">
                <p>${datapoke.results[i].name}</p>
                </button>
                `;
        }
    })
    n = n + 20;
    document.getElementById('myBtn').setAttribute('onclick','cantidadPokes(' + n + ')')
}

cantidadPokes(n)


function modalPokemonInfo(NameIdPokemon){
        fetch(urlpokeapi + NameIdPokemon)
    .then(res => res.json())
    .then(datapoke => {
        document.querySelector("#modal-pokemon .modal-contenedor").innerHTML = `
            
            <div class="data-pokemon">
                <div class="picture">
                    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${datapoke.id.toString().padStart(3, '0')}.png" alt="${datapoke.species.name}"> 
                </div>
                <div class="informacion-pokemon">
                    <h2>${datapoke.species.name}</h2>
                    <a href="${urlpokeapi + NameIdPokemon}">${urlpokeapi + NameIdPokemon}</a>
                    <div class="numerico-info">
                        <div class="row">
                            <div class="column-left">Height:</div>
                            <div class="column-right">${datapoke.height}</div>
                        </div>
                        <div class="row">
                            <div class="column-left">Weight:</div>
                            <div class="column-right">${datapoke.weight}</div>
                        </div>
                        <div class="row">
                            <div class="column-left">Generation:</div>
                            <div class="column-right">${datapoke.id}</div>
                        </div>
                        <div class="row">
                            <div class="column-left">Gender:</div>
                            <div class="column-right">${datapoke.id}</div>
                        </div>
                        <div class="row">
                            <div class="column-left">Hability:</div>
                            <div class="column-right">${datapoke.abilities.map((a) => a.ability.name).join(', ').toUpperCase()}</div>
                        </div>
                        <div class="row">
                            <div class="column-left">Color:</div>
                            <div class="column-right">${datapoke.id}</div>
                        </div>
                    </div>
                    <h3>Types:</h3>
                    ${datapoke.types.map((type) => type.type.name).join(', ').toUpperCase()}
                </div>
            </div>
            <div class="evolucion-pokemon">
                ${datapoke.types.map((type) => type.type.name).join(', ').toUpperCase()}
            </div>
            
            `;
        
    })
    document.getElementById("modal-pokemon").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal-pokemon").style.display = "none";
}


const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');

function buscadorPokemon(){
    console.log(formulario.value);

    fetch('https://pokeapi.co/api/v2/pokedex/national')
    .then(res => res.json())
    .then(datapoke => {
        //alert(datapoke.pokemon_entries[4].pokemon_species.name)
        const texto = formulario.value.toLowerCase();
        for (let i = 1; i < 898; i++) {
            //console.log(datapoke.pokemon_entries[i].pokemon_species.name)
            let nombre = datapoke.pokemon_entries[i].pokemon_species.name.toLowerCase();
            if(nombre.indexOf(texto) !== -1){
                resultado.innerHTML += `
                    <li>${datapoke.pokemon_entries[i].pokemon_species.name}</li>
                    `;
            }
        }
    })
}
