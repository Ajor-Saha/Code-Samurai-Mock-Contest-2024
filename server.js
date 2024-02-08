require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/book.route');
const searchRoutes = require('./routes/search.route');
const connectToDatabase = require("./db");


connectToDatabase();


const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(4000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

app.use('/api/books', searchRoutes);
app.use('/api', bookRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});