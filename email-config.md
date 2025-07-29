# Email Configuration Guide - IONOS SMTP

## Required Environment Variables

To enable automatic email functionality using IONOS SMTP, you need to set up the following environment variables:

### 1. Create a `.env` file in the root directory with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/alpha-insights

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_here

# IONOS SMTP Configuration
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=465
SMTP_USER=your_ionos_email@yourdomain.com
SMTP_PASS=your_ionos_email_password
FROM_EMAIL=noreply@yourdomain.com

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 2. IONOS SMTP Setup

1. **IONOS Email Account**: 
   - Log into your IONOS control panel
   - Go to Email & Office → Email
   - Create or use an existing email account

2. **SMTP Settings (from your image)**:
   - **SMTP Server**: `smtp.ionos.fr`
   - **Port**: `465` (TLS enabled)
   - **Security**: TLS/SSL
   - **Username**: Your full email address
   - **Password**: Your email account password

3. **Alternative IONOS SMTP Settings** (if the above doesn't work):
   - **SMTP Server**: `smtp.ionos.com`
   - **Port**: `587` (TLS) - less secure
   - **Security**: STARTTLS

### 3. Email Templates

The system includes three automatic email templates:

#### Newsletter Welcome Email
- **Trigger**: When someone subscribes to the newsletter
- **Content**: Welcome message, benefits list, premium upgrade CTA
- **Template**: `newsletter` in `api/email-service.js`

#### Premium Welcome Email
- **Trigger**: When someone signs up for premium account
- **Content**: Welcome message, premium features, access links
- **Template**: `premium` in `api/email-service.js`



### 4. Testing

To test the email functionality:

1. **Install dependencies**: `npm install` (this will install nodemailer)
2. **Start the server**: `npm start`
3. **Subscribe to newsletter**: Visit `/newsletter.html`

5. **Sign up for premium**: Visit `/premium-account.html`

### 5. Monitoring

- Check server logs for email sending status
- Monitor your IONOS email account for sent emails
- Failed emails are logged but don't break the registration process
- Check IONOS control panel for email delivery reports

### 6. Customization

You can customize email templates by editing the `emailTemplates` object in `api/email-service.js`:

- HTML styling and layout
- Content and messaging
- Links and CTAs
- Branding elements

### 7. Troubleshooting

**Common Issues:**

- **"Email service not configured"**: Check SMTP_USER and SMTP_PASS in .env
- **"Authentication failed"**: Verify your IONOS email credentials
- **"Connection timeout"**: Check firewall settings and SMTP port
- **"Invalid hostname"**: Verify SMTP_HOST is correct
- **"TLS/SSL issues"**: Try changing port to 465 or setting secure: true

**IONOS-Specific Issues:**

- **Rate limiting**: IONOS may limit emails per hour/day
- **Spam filters**: Ensure your FROM_EMAIL matches your IONOS domain
- **Authentication**: Use your full email address as SMTP_USER
- **Password**: Use your email account password, not your IONOS account password

**Testing without SMTP:**
If you don't have IONOS SMTP set up, the system will log warnings but continue to work normally. Users will still be registered, but no emails will be sent.

### 8. Security Best Practices

- **Use environment variables**: Never hardcode SMTP credentials
- **TLS encryption**: Always use port 587 or 465 for security
- **Strong passwords**: Use a strong password for your email account
- **Regular monitoring**: Check logs for failed email attempts
- **Backup email**: Consider having a backup email service

### 9. Production Considerations

- **Email limits**: Check IONOS email sending limits
- **Domain reputation**: Ensure your domain has good email reputation
- **SPF/DKIM**: Set up proper email authentication records
- **Monitoring**: Set up alerts for email delivery failures
- **Backup**: Consider having a backup email service for reliability 