import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {options} from './helpers/swaggerOptions.js';
import nodemailer from 'nodemailer';

// Configure environment variables
dotenv.config();

// Database configuration
connectDB();

// Create Express app
const app = express();

const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

//Initialize Swagger-jsdoc
const specs = swaggerJsdoc(options);
// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes

app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
    console.log(`Example app is running at port ${port}`.bgCyan.white);
});
