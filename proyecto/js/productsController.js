//Tomamos valores del formulario 
const productsController = document.querySelector('#productsForm');
//evento submit y funcion callback
productsController.addEventListener('submit', (e) => {
  //Recibimos evento
  //PreventDefault, para evitar que se recarge la pagina
  e.preventDefault();
  //Tomamos los campos del formulario
  const id = document.querySelector('#id').value;
  const nameProduct = document.querySelector('#nameProduct').value;
  const priceProduct = document.querySelector('#priceProduct').value;
  const descriptionProduct = document.querySelector('#descriptionProduct').value;

  //Guardamos los productos en un arreglo, si aun no los hay
  const Products = JSON.parse(localStorage.getItem('products')) || []

    //Creamos array de base datos productos
  Products.push({id: id, 
    nameProduct: nameProduct, 
    priceProduct: priceProduct, 
    descriptionProduct: descriptionProduct});
    //Guardamos en el storage
  localStorage.setItem('products', JSON.stringify(Products));
   
  //Borrando campos formulario
  productsController.reset();

 //Crear card
  const container = document.getElementById("cardContainer");
  //Tomamos la llave y el valor de los productos
function createCard(item){
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <img>
  <h5>id ${item.id}</h5>
  <p>name Product ${item.nameProduct}</p>
  <p>price Product ${item.priceProduct}</p>
  <p>description ${item.descriptionProduct}</p>
  `;
  return card;
}
//Por cada elemento creamos una card
//Falta validación
Products.forEach(item => {
  const card = createCard(item);
  container.appendChild(card);
});

})




/*
//Clase productController
class productController{

    constructor(id, nameProduct, priceProduct, descriptionProduct ){
      this.id = id;
      this.nameProduct = nameProduct;
      this.priceProduct = priceProduct;
      this.descriptionProduct = descriptionProduct;
    }
}
const productos = [];

const nuevoProduct = new productController(1,"Shampoo",125,"Fijador");
const nuevoProduct2 = new productController(2,"tinte",230,"tinte cabello");
const nuevoProduct3 = new productController(1,"Shampoo",125,"Fijador");
const nuevoProduct4 = new productController(1,"Shampoo",125,"Fijador");
const nuevoProduct5 = new productController(1,"Shampoo",125,"Fijador");
const nuevoProduct6 = new productController(1,"Shampoo",125,"Fijador");
const nuevoProduct7 = new productController(1,"Shampoo",125,"Fijador");



productos.push(nuevoProduct,nuevoProduct2,nuevoProduct3,nuevoProduct4,nuevoProduct5,nuevoProduct6);
console.log(productos);
*/
    /*  
    // Create the addItem method
    addItem(name, description) {
        const item = {
            // Increment the currentId property
            id: this.currentId++,
            name: "name",
            description: "description",
        };

        // Push the item to the items property
        this.items.push(item);
    }*/

