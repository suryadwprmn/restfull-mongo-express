const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

/* Model */

const Product  = require('./model/product');


app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
});

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/shop_db')
.then((result) => {
    console.log('Terhubung ke Database MongoDB');   
}).catch((err) => {
    console.error(err);
});


app.get('', (req,res) => {
    res.render('home')
});

// RESTFULL
app.get('/products', async (req,res) => {
    const products = await Product.find()
    res.render('product/index', {products})
})

//CREATE
app.get('/products/create', (req, res) => {
    res.render('product/create');
})






