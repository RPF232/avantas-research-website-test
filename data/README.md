# Data Collection System

This directory contains all user data collected from various forms across the AVANTAS Research website.

## Data Files

### `user-data.json`
Stores user information and premium signup attempts.
- **Structure**: Array of user objects
- **Fields**: email, timestamp, premiumSignups (array)



### `comments.json`
Stores blog post comments.
- **Structure**: Array of comment objects
- **Fields**: name, email, website, comment, postId, timestamp, status

### `login-attempts.json`
Stores login attempt tracking.
- **Structure**: Array of attempt objects
- **Fields**: email, success, ipAddress, userAgent, timestamp

### `consultation-requests.json`
Stores consultation booking requests.
- **Structure**: Array of request objects
- **Fields**: name, email, phone, consultationType, preferredDate, preferredTime, notes, timestamp, status

### `subscriptions.json` (in api/ directory)
Stores newsletter subscription emails.
- **Structure**: Array of email strings

## Admin Dashboard

Access the admin dashboard at: `/admin/data-dashboard.html`

The dashboard provides:
- Real-time statistics
- Tabbed view of all data types
- CSV download functionality
- Auto-refresh every 30 seconds

## API Endpoints

### Data Collection Endpoints
- `POST /api/data/comment` - Comment submission
- `POST /api/data/login-attempt` - Login attempt tracking
- `POST /api/data/premium-signup` - Premium account signup

### Data Retrieval Endpoints
- `GET /api/data/user-data` - Get all collected data (admin only)

## Data Privacy

All collected data is stored locally in JSON files. Ensure proper security measures are in place:
- Restrict access to admin dashboard
- Implement authentication for admin access
- Regular data backups
- Compliance with data protection regulations

## Forms Covered

1. **Consultation Booking** (index.html) ✅
2. **Newsletter Subscription** (newsletter.html) ✅

4. **Login Attempts** (login.html) ✅
5. **Comment Submission** (single-post.html) ✅
6. **Premium Account Signup** (subscribe.html, premium-account.html) ✅

## Usage

1. Start the server: `node server.js`
2. Access admin dashboard: `http://localhost:3000/admin/data-dashboard.html`
3. View collected data in real-time
4. Download data as needed for analysis

## Security Notes

- The admin dashboard should be protected with authentication
- Consider implementing rate limiting on data collection endpoints
- Regularly backup data files
- Monitor for suspicious activity in login attempts 