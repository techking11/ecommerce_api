const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/db');

app.use(express.json());

// Database Connection
connectDB();

// All Routers
const userRoute = require('./routes/user');
app.use('/api/users', userRoute);

const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

const productRoute = require('./routes/product');
app.use('/api/products', productRoute);

const cartRoute = require('./routes/cart');
app.use('/api/carts', cartRoute);

const orderRoute = require('./routes/order');
app.use('/api/orders', orderRoute);

// Server Listening
app.listen(5000, () => {
    console.log("Backend server is running !");
});