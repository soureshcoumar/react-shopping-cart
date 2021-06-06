const express = require('express');
const connectDB = require('./config/db')
const mongoose = require('mongoose')
const shortid = require('shortid')

const app = express();


//Init Middleware
app.use(express.json())


//Connect DataBase
connectDB()

app.get('/', (req, res) => res.send('API Running'))

const Product = mongoose.model('products', new mongoose.Schema({
    id: {
        type: String, default: shortid.generate
    },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
}))

app.get('/api/products', async (req, res) => {
    const products = await Product.find({})
    res.send(products)
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body) 
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
});

app.get('/api/products/:id', async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deleteProduct)
})     
    
//Define Routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
