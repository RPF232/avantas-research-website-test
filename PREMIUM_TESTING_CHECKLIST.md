# Premium Account Functionality Testing Checklist

## 🎯 Overview
This checklist helps you systematically test all aspects of premium account functionality to ensure everything works correctly when users login with premium accounts.

## ✅ Pre-Testing Setup

### Environment Setup
- [ ] Server is running (`node server.js`)
- [ ] MongoDB is connected and accessible
- [ ] Environment variables are properly configured (`.env` file)
- [ ] Stripe API keys are valid and working
- [ ] Email service (IONOS SMTP) is configured

### Database Setup
- [ ] MongoDB database exists and is accessible
- [ ] User collection is properly indexed
- [ ] Test premium user account exists in database

## 🔧 Automated Testing

### Run Automated Tests
```bash
# Install dependencies if needed
npm install node-fetch

# Run the automated test suite
node test-premium-functionality.js
```

### Expected Results
- [ ] All API endpoints respond correctly
- [ ] Token consistency check passes
- [ ] File structure validation passes
- [ ] Server connection test passes

## 👤 Manual Testing - User Journey

### 1. Premium Account Creation Flow

#### Step 1: Premium Signup
- [ ] Navigate to `/subscribe.html` or `/premium-account.html`
- [ ] Click "Get Premium Access" or "Purchase Now"
- [ ] Verify Stripe checkout opens
- [ ] Complete payment with test card: `4242 4242 4242 4242`
- [ ] Verify redirect to `/complete-registration.html`

#### Step 2: Account Registration
- [ ] Verify email is pre-filled from Stripe session
- [ ] Enter password and confirm password
- [ ] Click "Create Account"
- [ ] Verify success message and redirect to `/login.html`

#### Step 3: Database Verification
- [ ] Check MongoDB for new user record
- [ ] Verify `isPremium: true`
- [ ] Verify `subscriptionDate` is set
- [ ] Verify email matches Stripe session

### 2. Premium User Login Flow

#### Step 1: Login Process
- [ ] Navigate to `/login.html`
- [ ] Enter premium user credentials
- [ ] Click "Login"
- [ ] Verify success message
- [ ] **CRITICAL**: Verify redirect to `/trade-ideas.html` (not `/index.html`)

#### Step 2: Token Storage
- [ ] Open browser developer tools
- [ ] Check localStorage for `authToken`
- [ ] Verify token is present and valid JWT format

#### Step 3: Premium Status Verification
- [ ] Check browser console for premium status logs
- [ ] Verify API call to `/api/auth/verify-premium` succeeds
- [ ] Verify response shows `isPremium: true`

### 3. Premium Content Access Testing

#### Trade Ideas Page (`/trade-ideas.html`)
- [ ] Verify all trade ideas are visible
- [ ] Verify no "upgrade to premium" messages
- [ ] Verify all download buttons work
- [ ] Check that premium.js is loaded and working

#### Tools Page (`/tools.html`)
- [ ] Verify all premium downloads are accessible
- [ ] Click on premium download cards
- [ ] Verify files download successfully
- [ ] Check browser console for successful API calls
- [ ] Verify no "premium required" messages

#### Homepage (`/index.html`)
- [ ] Verify premium articles are visible in slider
- [ ] Verify no premium upgrade slides
- [ ] Check that all premium content sections are accessible

#### Articles and Blog Posts
- [ ] Navigate to any article page
- [ ] Verify premium content is visible
- [ ] Verify download links work for premium users

### 4. File Download Testing

#### Premium Tools Downloads
- [ ] Navigate to `/tools.html`
- [ ] Click on any premium download card
- [ ] Verify file downloads successfully
- [ ] Check browser network tab for successful API calls
- [ ] Verify files are the correct size and format

#### API Endpoint Testing
- [ ] Test `/api/download/[filename]` with valid token
- [ ] Verify 200 response and file download
- [ ] Test with invalid token (should return 401)
- [ ] Test with non-premium user token (should return 403)

### 5. Non-Premium Access Testing

#### Logout and Test Restrictions
- [ ] Logout or clear localStorage
- [ ] Navigate to premium pages
- [ ] Verify upgrade prompts appear
- [ ] Verify premium content is hidden
- [ ] Verify download attempts show premium message

#### Direct File Access
- [ ] Try to access `/assets/Tools/[filename]` directly
- [ ] Verify 403 Forbidden response
- [ ] Verify no file content is exposed

## 🔍 Technical Verification

### API Endpoints Testing
- [ ] `POST /api/auth/login` - Returns token and premium status
- [ ] `GET /api/auth/verify-premium` - Verifies premium status
- [ ] `GET /api/download/[filename]` - Secure file downloads
- [ ] `POST /api/stripe/create-checkout-session` - Stripe integration

### Frontend JavaScript Testing
- [ ] `premium.js` loads correctly
- [ ] Token retrieval uses correct key (`authToken`)
- [ ] Premium status check works
- [ ] Content show/hide functions work
- [ ] Download functions work with authentication

### Security Testing
- [ ] Protected files are not accessible without authentication
- [ ] API endpoints require valid JWT tokens
- [ ] Premium status is verified server-side
- [ ] No sensitive data exposed in client-side code

## 🐛 Common Issues and Solutions

### Issue: Token Mismatch
**Symptoms**: Premium status not working, console errors
**Solution**: Ensure all files use `authToken` (not `token`)

### Issue: Premium Content Not Showing
**Symptoms**: Premium users see upgrade prompts
**Solution**: 
- Check browser console for errors
- Verify token is stored correctly
- Check API response for premium status

### Issue: Downloads Not Working
**Symptoms**: Clicking download buttons does nothing
**Solution**:
- Check authentication headers
- Verify file paths are correct
- Check server logs for errors

### Issue: Stripe Integration Failing
**Symptoms**: Checkout doesn't work
**Solution**:
- Verify Stripe API keys
- Check webhook configuration
- Test with Stripe test mode

## 📊 Testing Results Template

```
Test Date: _______________
Tester: _________________

### Premium Account Creation
- [ ] Stripe checkout works
- [ ] Account creation successful
- [ ] Database record created correctly

### Premium Login
- [ ] Login successful
- [ ] Redirects to trade-ideas.html
- [ ] Token stored correctly
- [ ] Premium status verified

### Content Access
- [ ] Trade ideas page - All content visible
- [ ] Tools page - Downloads work
- [ ] Homepage - Premium articles visible
- [ ] Articles - Premium content accessible

### Security
- [ ] Protected files blocked
- [ ] API endpoints secure
- [ ] Non-premium users restricted

### Issues Found:
1. _________________
2. _________________
3. _________________

### Overall Status:
- [ ] ✅ All tests passed
- [ ] ⚠️ Minor issues found
- [ ] ❌ Major issues found
```

## 🚀 Quick Test Commands

```bash
# Start server
node server.js

# Run automated tests
node test-premium-functionality.js

# Check server logs
tail -f server.log

# Test API endpoints
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 📞 Support

If you encounter issues:
1. Check server logs for error messages
2. Verify all environment variables are set
3. Test with the automated test suite
4. Check browser console for JavaScript errors
5. Verify database connectivity and user records 