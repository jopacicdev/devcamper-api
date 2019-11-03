const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to db
connectDB();

// route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// dev loggging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);

    // Close server and exit process
    server.close(() => process.exit(1));
});