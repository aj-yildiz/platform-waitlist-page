# Vastis Waitlist System

This document explains how the waitlist system works and how to access the collected emails.

## How It Works

1. When a user submits their email through the waitlist form, it's processed by the `subscribeToWaitlist` server action.
2. The email is stored in Airtable along with a timestamp and source information.
3. All submissions are also logged to the console for backup purposes.

## Accessing the Emails

There are several ways to access the collected emails:

### 1. Admin Page

Visit `/admin/waitlist` in your application to see a table of all collected emails.

### 2. API Endpoint

You can access the emails programmatically through the API endpoint:

```
GET /api/waitlist
```

This returns a JSON response with all collected emails.

### 3. Direct Airtable Access

The emails are stored in your Airtable base. You can access and manage them directly from the Airtable UI.

## Troubleshooting

If you're experiencing issues with the waitlist system:

1. Check the server logs for any error messages
2. Verify that your Airtable API credentials are correct and environment variables are set
3. Ensure the application has permission to access Airtable

For any other issues, please contact the development team.
