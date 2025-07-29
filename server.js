const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Simple test endpoint to force Railway deployment
app.get('/api/railway-test', (req, res) => {
    res.json({ 
        message: 'Railway deployment test successful',
        timestamp: new Date().toISOString(),
        mongoDB: process.env.MONGODB_URI ? 'Present' : 'Missing'
    });
});

// MongoDB Connection - Make it more robust
const connectDB = async () => {
    try {
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000, // 30 seconds
                socketTimeoutMS: 45000, // 45 seconds
                bufferCommands: false,
                bufferMaxEntries: 0
            });
            console.log('Connected to MongoDB Atlas');
        } else {
            console.log('MONGODB_URI not set - running without database');
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.log('Continuing without database connection');
    }
};

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint to check environment variables (must be before static files)
app.get('/api/test-env', (req, res) => {
    res.json({
        hasMongoDB: !!process.env.MONGODB_URI,
        mongoDBLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
        mongoDBStart: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) : 'none',
        hasJWT: !!process.env.JWT_SECRET,
        hasStripe: !!process.env.STRIPE_SECRET_KEY,
        hasEmail: !!process.env.EMAIL_USER
    });
});

// Protect premium files from direct access
app.use('/assets/Tools', (req, res, next) => {
    res.status(403).json({ message: 'Access denied. Premium content requires authentication.' });
});

// Serve static files from root directory (excluding protected directories)
app.use(express.static('.', {
    setHeaders: (res, path) => {
        // Block access to premium tools directory
        if (path.includes('/assets/Tools/')) {
            res.status(403).send('Access denied');
        }
    }
}));

// Secure download endpoint for premium files
app.get('/api/download/:filename', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const User = mongoose.model('User');
        const user = await User.findById(decoded.userId);

        if (!user || !user.isPremium) {
            return res.status(403).json({ message: 'Premium account required' });
        }

        const filename = req.params.filename;
        const filePath = path.join(__dirname, 'assets', 'Tools', filename);
        
        // Validate filename to prevent directory traversal
        if (!filename || filename.includes('..') || filename.includes('/')) {
            return res.status(400).json({ message: 'Invalid filename' });
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(404).json({ message: 'File not found' });
            }
        });
    } catch (error) {
        console.error('Download endpoint error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
});

// API Routes
const subscribeRouter = require('./api/subscribe');
const consultationRouter = require('./api/consultation');
const authRouter = require('./api/auth');
const stripeRouter = require('./api/stripe');
const dataCollectionRouter = require('./api/data-collection');

app.use('/api', subscribeRouter);
app.use('/api/consultation', consultationRouter);
app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/data', dataCollectionRouter);

// Trending News API Endpoint
app.get('/api/trending-news', async (req, res) => {
    const fs = require('fs').promises;
    const trendingNewsPath = path.join(__dirname, 'trending_news.json');
    try {
        const data = await fs.readFile(trendingNewsPath, 'utf8');
        const news = JSON.parse(data);
        res.json(news);
    } catch (err) {
        // If file doesn't exist or is empty, return an empty array
        res.json([]);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Railway deployment test - MongoDB URI check:', process.env.MONGODB_URI ? 'Present' : 'Missing');
}); 