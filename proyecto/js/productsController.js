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
productos.push(nuevoProduct,nuevoProduct2);
console.log(productos);

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


