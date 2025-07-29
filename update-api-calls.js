const fs = require('fs');
const path = require('path');

// Files that need API call updates
const filesToUpdate = [
    'newsletter.html',
    'premium-account.html',
    'subscribe.html',
    'forgot-password.html',
    'reset-password.html',
    'complete-registration.html',
    'tools.html',
    'single-post.html',
    'admin/data-dashboard.html',
    'admin/subscribers.html'
];

// API endpoints to update
const apiEndpoints = [
    '/api/subscribe',
    '/api/data/premium-signup',
    '/api/stripe/create-checkout-session',
    '/api/auth/request-password-reset',
    '/api/auth/reset-password',
    '/api/stripe/session-status',
    '/api/auth/complete-premium-registration',
    '/api/download/',
    '/api/data/comment',
    '/api/data/user-data',
    '/api/subscriptions.json'
];

function updateFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Update fetch calls
    apiEndpoints.forEach(endpoint => {
        const oldPattern = `fetch('${endpoint}'`;
        const newPattern = `fetch(getApiUrl('${endpoint}'`;
        
        if (content.includes(oldPattern)) {
            content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
            updated = true;
            console.log(`Updated ${endpoint} in ${filePath}`);
        }

        // Also check for fetch calls with localhost
        const localhostPattern = `fetch('http://localhost:3000${endpoint}'`;
        if (content.includes(localhostPattern)) {
            content = content.replace(new RegExp(localhostPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
            updated = true;
            console.log(`Updated localhost ${endpoint} in ${filePath}`);
        }
    });

    // Add config.js script if not present
    if (!content.includes('assets/js/config.js') && content.includes('<script')) {
        const scriptPattern = /(<script[^>]*src="[^"]*"[^>]*>)/;
        const configScript = '    <script src="assets/js/config.js"></script>\n';
        
        // Find the first script tag and add config.js before it
        const match = content.match(scriptPattern);
        if (match) {
            content = content.replace(match[1], configScript + match[1]);
            updated = true;
            console.log(`Added config.js to ${filePath}`);
        }
    }

    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Updated ${filePath}`);
    } else {
        console.log(`⏭️  No changes needed for ${filePath}`);
    }
}

console.log('🔄 Updating API calls in HTML files...\n');

filesToUpdate.forEach(file => {
    updateFile(file);
});

console.log('\n✅ API call updates completed!');
console.log('\n📝 Next steps:');
console.log('1. Deploy your backend to Railway/Heroku');
console.log('2. Update the production URL in assets/js/config.js');
console.log('3. Upload your updated HTML files to IONOS'); 