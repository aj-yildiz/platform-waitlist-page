# Supabase Setup Guide

This guide will help you configure Supabase as the database for your waitlist application.

## Prerequisites

- A Supabase project (sign up at [supabase.com](https://supabase.com))
- Access to your project's database via the Supabase dashboard

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - Project URL (starts with `https://your-project.supabase.co`)
   - Project API Key (anon/public key)
   - Service Role Key (for admin operations)

## Step 2: Set Up Environment Variables

Create a `.env.local` file in your project root with the following:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: Never commit the `.env.local` file to version control!

## Step 3: Update Your Database Schema

Your existing `waitlist` table needs additional columns. Run this SQL in your Supabase SQL editor:

```sql
-- Add new columns to the waitlist table
ALTER TABLE waitlist 
ADD COLUMN form_type VARCHAR(50) DEFAULT 'waitlist' NOT NULL;

ALTER TABLE waitlist 
ADD COLUMN user_type VARCHAR(50);

ALTER TABLE waitlist 
ADD COLUMN location VARCHAR(255);

-- Add constraints
ALTER TABLE waitlist 
ADD CONSTRAINT form_type_check 
CHECK (form_type IN ('waitlist', 'space_suggestion'));

ALTER TABLE waitlist 
ADD CONSTRAINT user_type_check 
CHECK (user_type IS NULL OR user_type IN ('Patient', 'Practitioner', 'Gym'));

-- Create indexes for better performance
CREATE INDEX idx_waitlist_form_type ON waitlist(form_type);
CREATE INDEX idx_waitlist_user_type ON waitlist(user_type);
```

## Step 4: Configure Row Level Security (RLS)

For security, enable Row Level Security on your table:

```sql
-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the signup form)
CREATE POLICY "Allow public inserts" ON waitlist
FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all data (for admin)
CREATE POLICY "Allow authenticated users to read" ON waitlist
FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete (for admin)
CREATE POLICY "Allow authenticated users to delete" ON waitlist
FOR DELETE USING (auth.role() = 'authenticated');
```

## Step 5: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit your waitlist page and try submitting a form
3. Check your Supabase dashboard → **Table Editor** → **waitlist** to see the new entry
4. Visit `/admin/waitlist` to view and manage entries

## Database Schema

Your `waitlist` table should now have these columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `email` | varchar | User's email address |
| `timestamp` | timestamptz | When the form was submitted |
| `source` | varchar | Source of the signup (e.g., "Website") |
| `created_at` | timestamptz | When the record was created |
| `updated_at` | timestamptz | When the record was last updated |
| `form_type` | varchar | "waitlist" or "space_suggestion" |
| `user_type` | varchar | "Patient", "Practitioner", or "Gym" (for waitlist) |
| `location` | varchar | Location suggestion (for space suggestions) |

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**: Check that your environment variables are set correctly
2. **"Permission denied" error**: Make sure RLS policies are configured properly
3. **"Column doesn't exist" error**: Ensure you've run the schema update SQL

### Testing the Connection:

You can test your Supabase connection by visiting `/admin/waitlist` and checking if data loads properly.

## Next Steps

- Set up email notifications for new signups
- Add data export functionality
- Configure backup procedures
- Set up monitoring and analytics

## Support

If you encounter issues, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Your browser's developer console for error messages 