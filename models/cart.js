const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct (id, productPrice) {
        //reecuperar el caarrito anterior de nuestro archivo        
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //analizar el carrito, encontrar el producto existsente
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct;
            //agregar nuevo producto /aumentar la cantidad
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products =[...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });            
        });
    }
};