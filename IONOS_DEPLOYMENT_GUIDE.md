# 🚀 IONOS Static Hosting + External Backend Deployment Guide

## 📋 **Overview**

Since IONOS static hosting cannot run Node.js servers, we'll deploy your backend separately and connect your static frontend to it.

## 🎯 **Architecture**

```
IONOS Static Hosting (Frontend)
    ↓ (API calls)
Railway/Heroku (Backend)
    ↓ (Database)
MongoDB Atlas (Database)
```

## 🚀 **Step 1: Deploy Backend to Railway**

### **1.1 Sign Up for Railway**
1. Go to [railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Create a new project

### **1.2 Connect Your Repository**
1. Click "Deploy from GitHub repo"
2. Select your repository
3. Railway will auto-detect your Node.js app

### **1.3 Set Environment Variables**
In Railway dashboard → Variables tab, add:

```env
# MongoDB Atlas (Free cloud database)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alpha-insights

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Stripe Keys (get from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

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

### **1.4 Get Your Railway URL**
After deployment, your app will be available at:
`https://your-app-name.railway.app`

## 🔧 **Step 2: Update Frontend Configuration**

### **2.1 Update API Configuration**
Edit `assets/js/config.js` and replace the production URL:

```javascript
const API_CONFIG = {
    development: {
        baseUrl: 'http://localhost:3000'
    },
    production: {
        baseUrl: 'https://your-app-name.railway.app' // Replace with your actual Railway URL
    }
};
```

### **2.2 API Calls Already Updated**
✅ All HTML files have been updated to use the new API configuration
✅ Config.js script has been added to all pages
✅ API calls now use `getApiUrl()` function

## 🗄️ **Step 3: Set Up MongoDB Atlas**

### **3.1 Create MongoDB Atlas Account**
1. Go to [mongodb.com](https://mongodb.com)
2. Create a free account
3. Create a new cluster (free tier)

### **3.2 Get Connection String**
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Add to Railway environment variables

## 💳 **Step 4: Set Up Stripe**

### **4.1 Create Stripe Account**
1. Go to [stripe.com](https://stripe.com)
2. Create an account
3. Get your API keys from the dashboard

### **4.2 Configure Webhooks**
1. In Stripe dashboard, go to Webhooks
2. Add endpoint: `https://your-app-name.railway.app/api/stripe/webhook`
3. Select events: `checkout.session.completed`
4. Copy the webhook secret to Railway environment variables

## 📧 **Step 5: Configure Email (IONOS SMTP)**

### **5.1 IONOS Email Setup**
1. Use your IONOS email credentials
2. Enable SMTP in IONOS control panel
3. Use these settings:
   - Host: `smtp.ionos.fr`
   - Port: `465`
   - Security: `SSL/TLS`

## 🚀 **Step 6: Deploy Frontend to IONOS**

### **6.1 Upload Files**
1. Upload all HTML, CSS, JS files to IONOS
2. Make sure `assets/js/config.js` is included
3. Test that all pages load correctly

### **6.2 Test API Connection**
1. Open browser console on your site
2. Check for any CORS errors
3. Test login functionality

## 🧪 **Step 7: Create Test Account**

After deployment, create a premium test account:

```javascript
// In Railway console or via API
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

## ✅ **Step 8: Testing Checklist**

- [ ] **Login works**: Test with premium account
- [ ] **Premium content accessible**: Verify tools page works
- [ ] **Stripe payments**: Complete a test payment
- [ ] **Email notifications**: Check welcome emails
- [ ] **Consultation booking**: Test booking form
- [ ] **Newsletter subscription**: Test subscription
- [ ] **Password reset**: Test forgot password flow

## 🔧 **Troubleshooting**

### **CORS Errors**
If you get CORS errors, Railway should handle this automatically. If not, check that your Railway app is running.

### **API Connection Issues**
1. Verify Railway URL is correct in `config.js`
2. Check Railway logs for errors
3. Test API endpoints directly

### **Email Not Working**
1. Verify IONOS SMTP credentials
2. Check Railway logs for email errors
3. Test with a simple email first

## 📊 **Cost Breakdown**

- **IONOS Static Hosting**: Your current plan
- **Railway Backend**: Free tier available, then $5/month
- **MongoDB Atlas**: Free tier (512MB)
- **Stripe**: No monthly fee, only transaction fees
- **Total**: ~$5/month for backend hosting

## 🎯 **Expected Result**

After deployment:
- ✅ Login works with premium accounts
- ✅ Stripe payments process correctly
- ✅ Premium content is accessible
- ✅ Email notifications are sent
- ✅ All forms submit to external backend
- ✅ No more "Unexpected token '<'" errors

## 📞 **Support**

If you encounter issues:
1. Check Railway logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Test API endpoints directly

---

**Status**: Ready for deployment
**Estimated Time**: 1-2 hours
**Cost**: ~$5/month for backend hosting 