const baseURL='https://pokeapi.co/api/v2/pokemon/';
const pokemon =document.getElementById('pokemonName');
const buttonSearch = document.getElementById('searchPokemon');
const buttonDelete = document.getElementById('deletePokemon');
const appNode = document.getElementById('app');

buttonSearch.addEventListener('click',insertPokemon);


buttonDelete.addEventListener('click',deletePokemon);


function insertPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`)
        .then(response=> {
            if (response.status===404){
                alert('Este pokémon no está disponible, prueba con otro')
            } else{
                return response.json()
            }
        })
        .then(responseJSON=>{
            const allItems = [];

            const result = [];

            for(let pokemonInfo in responseJSON){
                result.push([pokemonInfo , responseJSON[pokemonInfo]]);
            }

            console.table(result);

            //* Agregar imagen
            const pokemonImage = document.createElement('img');
            pokemonImage.src = result [14][1].front_default;

            //*para el nombre
            const pokemonName = document.createElement('h2');
            pokemonName.innerText = `Name:${result[10][1]} - ID: ${result[6][1]}`;

            //* Tipo
            const pokemonType = document.createElement('h2');
            pokemonType.innerText = `Type: ${result [16][1][0].type.name}`;
            
            //*recuadro
            const container = document.createElement('div');
            container.append(pokemonImage , pokemonName , pokemonType)

            allItems.push(container)

            appNode.append(...allItems)
        })
}

function deletePokemon(){
    let allPokemon = appNode.childNodes 
    allPokemon = Array.from(allPokemon) 

    allPokemon.forEach(pokemon => {
        pokemon.remove(pokemon)
    })
    document.getElementById(inputFields).value="";
}
