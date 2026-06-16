const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();

const port = process.env.PORT;
const app = express();

// MongoDB Connection;
connectDB();


app.listen(port, () => {
    console.log(`Server Running on Port ${port}`);
})