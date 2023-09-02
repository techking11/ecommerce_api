const mongoose = require('mongoose');

async function connectDB(){
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerceapi');
        console.log('Database connected !');
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = connectDB;