const dotenv = require('dotenv');
const path = require('path');

const loadEnv = () => {
    const envPath = path.join(__dirname, '../../.env');
    dotenv.config({ path: envPath });

    const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
    
    requiredEnvVars.forEach(varName => {
        if (!process.env[varName]) {
            throw new Error(`Missing required environment variable: ${varName}`);
        }
    });

    // Set default values for optional variables
    process.env.PORT = process.env.PORT || '5000';
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
};

module.exports = loadEnv;