# Railway Deployment Guide

## 🚀 **Railway - Free Node.js Hosting**

Since Heroku requires payment verification, Railway is an excellent alternative with a generous free tier.

## 📋 **Step 1: Sign Up for Railway**

1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Railway will automatically detect your Node.js project

## 📋 **Step 2: Connect Your Repository**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your repository

## 📋 **Step 3: Configure Environment Variables**

In Railway dashboard, go to your project → Variables tab and add:

```env
# MongoDB (use MongoDB Atlas)
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

## 📋 **Step 4: Set Up MongoDB Atlas**

1. Go to [mongodb.com](https://mongodb.com)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add it to Railway environment variables

## 📋 **Step 5: Deploy**

1. Railway will automatically detect your `package.json`
2. It will install dependencies and start your server
3. Your app will be available at `https://your-app-name.railway.app`

## 📋 **Step 6: Create Premium Test Account**

After deployment, you can create the premium test account by:

1. Go to Railway dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Go to "Logs" tab
6. You can run commands there

Or use Railway CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run Node.js console
railway run node

# In the Node.js console, create the premium account:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

await mongoose.connect(process.env.MONGODB_URI);

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

## 🌐 **Alternative: Render Deployment**

If Railway doesn't work, try Render:

### **Step 1: Sign Up**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### **Step 2: Create Web Service**
1. Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: avantas-research
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### **Step 3: Set Environment Variables**
Add the same environment variables as above.

## 🌐 **Alternative: Vercel Deployment**

Vercel is great for frontend + API:

### **Step 1: Sign Up**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### **Step 2: Deploy**
1. Import your repository
2. Vercel will auto-detect it's a Node.js app
3. Add environment variables
4. Deploy

## 📋 **Testing After Deployment**

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

1. **MongoDB**: Use MongoDB Atlas (cloud database)
2. **Environment Variables**: Set all required variables
3. **Domain**: Update your domain DNS to point to the new hosting
4. **SSL**: All platforms provide free SSL certificates
5. **Webhooks**: Update Stripe webhook URLs to point to your new app

## 🎯 **Expected Result**

After deployment:
- ✅ Login will work correctly
- ✅ Premium accounts will function
- ✅ Stripe payments will work
- ✅ All premium content will be accessible
- ✅ No more "Unexpected token '<'" errors

---

**Status**: Ready for deployment
**Recommended Platform**: Railway
**Estimated Time**: 30-60 minutes
**Cost**: Free tier available 