//Leer localstorage
//Convertir JSON a un array para poder vincular a las cards
//Mostar las cards necesarias según el numero de productos y resolución
const container = document.querySelector("main")
const localData = JSON.parse(localStorage.key(1));

if(localData === null){
    const message = `
    <p>Lo sentimos, ahorita no tenemos productos, regresa más tarde</p>`
}
