const mongoose = require('mongoose');

const conn = async () => {
    try {
        await mongoose.connect('mongodb+srv://user:user@cluster0.w36kj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports=conn;