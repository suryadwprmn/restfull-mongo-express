const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const app = express();

const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

// Middleware untuk mengurai data formulir
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware untuk method-override
app.use(methodOverride('_method'));

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

app.post('/products/create', async(req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.redirect('/products');
    } catch (error) {
        console.error('Tidak Bisa Membuat ' , err);
        res.status(500).send('Error create product')
    }
})

app.get('/products/:id' ,async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('product/show', {product});
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product/edit', { product });
    } catch (error) {
        console.error('Error finding product:', error);
    }
});

app.put('/products/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        console.error('Error updating data', error)
    }
})

app.delete('/products/:id', async(req,res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).send('Product not found');
        }
        res.redirect('/products')
    } catch (error) {
        console.error('Error deleting product: ', error)
    }
})





