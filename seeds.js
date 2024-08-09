const mongoose = require('mongoose');
const Product  = require('./model/product');

mongoose.connect('mongodb://localhost:27017/shop_db')
.then((result) => {
    console.log('Terhubung ke Database MongoDB');   
}).catch((err) => {
    console.error(err);
});

const products = [
    {
        name: 'T-Shirt Basic',
        brand: 'Brand A',
        price: 20.00,
        color: 'Red',
        category: 'Baju'
    },
    {
        name: 'Denim Jacket',
        brand: 'Brand B',
        price: 50.00,
        color: 'Blue',
        category: 'Jaket'
    },
    {
        name: 'Running Shoes',
        brand: 'Brand C',
        price: 75.00,
        color: 'Black',
        category: 'Aksesoris'
    },
    {
        name: 'Chino Pants',
        brand: 'Brand D',
        price: 40.00,
        color: 'Beige',
        category: 'Celana'
    }
];


Product.insertMany(products)
.then((result) => {
    console.log('Berhasil Menambah data')    
}).catch((err) => {
    console.error(err);
});