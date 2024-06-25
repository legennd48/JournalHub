import express from 'express';
import cors from 'cors'; // Import the cors package
import routes from './routes/index';
import dbClient from './utils/db';

const app = express();
const port = process.env.PORT || 5000;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use CORS middleware

app.use(express.json());
app.use('/', routes);

dbClient.on('connected', () => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
