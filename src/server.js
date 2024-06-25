import express from 'express';
import cors from 'cors'; // Import the cors package
import routes from './routes/index';
import dbClient from './utils/db';

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/index');
const dbClient = require('./utils/db');


// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;


// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use CORS middleware


// Middleware to parse JSON

app.use(express.json());
app.use(bodyParser.json());

// Route handling
app.use('/api/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server once the database is connected
dbClient.on('connected', () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
