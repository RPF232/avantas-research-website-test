# Deployment Guide - Node.js Application

## 🚨 **IONOS Static Hosting Issue**

IONOS static hosting **cannot run Node.js servers**. This is why you're getting the "Unexpected token '<'" error when trying to login.

## 🚀 **Recommended Solution: Deploy to Heroku**

### **Step 1: Install Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from: https://devcenter.heroku.com/articles/heroku-cli
```

### **Step 2: Prepare Your Application**
Your application is already prepared with:
- ✅ `package.json` with correct dependencies
- ✅ `Procfile` for Heroku
- ✅ `server.js` as main entry point

### **Step 3: Set Up Environment Variables**
You'll need to set these environment variables in Heroku:

```bash
# MongoDB (use MongoDB Atlas for cloud database)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alpha-insights

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Stripe Keys
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (IONOS SMTP)
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_USER=your_ionos_email@yourdomain.com
SMTP_PASS=your_ionos_email_password
FROM_EMAIL=noreply@yourdomain.com

# Server Configuration
PORT=3000
NODE_ENV=production
```

### **Step 4: Deploy to Heroku**

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Add MongoDB addon (MongoDB Atlas)
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set JWT_SECRET=your_jwt_secret_here
heroku config:set STRIPE_SECRET_KEY=your_stripe_secret_key
heroku config:set STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
heroku config:set SMTP_HOST=smtp.ionos.fr
heroku config:set SMTP_PORT=465
heroku config:set SMTP_USER=your_ionos_email@yourdomain.com
heroku config:set SMTP_PASS=your_ionos_email_password
heroku config:set FROM_EMAIL=noreply@yourdomain.com
heroku config:set NODE_ENV=production

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open the app
heroku open
```

### **Step 5: Create Premium Test Account**
After deployment, create the premium test account:

```bash
# Connect to Heroku app
heroku run node

# In the Node.js console, run:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI);

// Create premium user
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('PremiumTest123!', salt);

const User = mongoose.model('User', {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    subscriptionDate: { type: Date },
    subscriptionEndDate: { type: Date }
});

const user = new User({
    email: 'premium-test@avantas.com',
    password: hashedPassword,
    isPremium: true,
    subscriptionDate: new Date()
});

await user.save();
console.log('Premium account created!');
```

## 🌐 **Alternative Hosting Options**

### **1. Railway (Recommended)**
- Free tier available
- Easy deployment
- Good for Node.js apps

### **2. Render**
- Free tier available
- Automatic deployments
- Good documentation

### **3. DigitalOcean App Platform**
- More control
- Scalable
- Good performance

### **4. Vercel**
- Great for frontend + API
- Easy deployment
- Good performance

## 🔧 **Testing After Deployment**

1. **Test Login**: Use the premium test account
2. **Test Stripe**: Complete a test payment
3. **Test Premium Content**: Verify access to all tools
4. **Test Email**: Verify welcome emails are sent

## 📋 **Working Credentials After Deployment**
```
📧 Email: premium-test@avantas.com
🔑 Password: PremiumTest123!
```

## ⚠️ **Important Notes**

1. **MongoDB**: Use MongoDB Atlas (cloud database) instead of local MongoDB
2. **Environment Variables**: Set all required environment variables in Heroku
3. **Domain**: Update your domain DNS to point to Heroku app
4. **SSL**: Heroku provides free SSL certificates
5. **Webhooks**: Update Stripe webhook URLs to point to your Heroku app

## 🎯 **Expected Result**

After deployment to Heroku:
- ✅ Login will work correctly
- ✅ Premium accounts will function
- ✅ Stripe payments will work
- ✅ All premium content will be accessible
- ✅ No more "Unexpected token '<'" errors

---

**Status**: Ready for deployment
**Recommended Platform**: Heroku
**Estimated Time**: 30-60 minutes 