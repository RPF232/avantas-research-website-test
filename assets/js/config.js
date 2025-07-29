// API Configuration
const API_CONFIG = {
    // Development (local)
    development: {
        baseUrl: 'http://localhost:3000'
    },
    // Production (Railway/Heroku)
    production: {
        baseUrl: 'https://your-app-name.railway.app' // Replace with your actual Railway URL
    }
};

// Get current environment
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? API_CONFIG.development : API_CONFIG.production;

// API helper function
function getApiUrl(endpoint) {
    return `${currentConfig.baseUrl}${endpoint}`;
}

// Export for use in other files
window.API_CONFIG = API_CONFIG;
window.getApiUrl = getApiUrl; 