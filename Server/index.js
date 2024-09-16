// Convert CommonJS to ES Module (Modern JavaScript)

import mongoose from 'mongoose';
import app from './app.js'; // Assuming app.js is the entry point

// Import environment variables (if using a bundler)
import { DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION } from './constants.js';

// Alternative (if not using a bundler)
// const { DB_USER, DB_PASSWORD, DB_HOST, IP_SERVER, API_VERSION } = process.env;

const PORT = process.env.PORT || 3977;

// Connect to MongoDB (async/await syntax for cleaner handling)
(async () => {
  try {
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}`);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

// Start the server (async/await for error handling)
(async () => {
  try {
    await app.listen(PORT);
    console.log("####################");
    console.log("##### API REST #####");
    console.log("####################");
    console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();