-- Add new columns to the waitlist table
-- Run this SQL in your Supabase SQL editor

-- Add form_type column to distinguish between waitlist and space suggestions
ALTER TABLE waitlist 
ADD COLUMN form_type VARCHAR(50) DEFAULT 'waitlist' NOT NULL;

-- Add user_type column for waitlist signups (Patient, Practitioner, Gym)
ALTER TABLE waitlist 
ADD COLUMN user_type VARCHAR(50);

-- Add location column for space suggestions
ALTER TABLE waitlist 
ADD COLUMN location VARCHAR(255);

-- Add check constraint to ensure form_type is valid
ALTER TABLE waitlist 
ADD CONSTRAINT form_type_check 
CHECK (form_type IN ('waitlist', 'space_suggestion'));

-- Add check constraint to ensure user_type is valid when provided
ALTER TABLE waitlist 
ADD CONSTRAINT user_type_check 
CHECK (user_type IS NULL OR user_type IN ('Patient', 'Practitioner', 'Gym'));

-- Create index on form_type for better query performance
CREATE INDEX idx_waitlist_form_type ON waitlist(form_type);

-- Create index on user_type for better query performance
CREATE INDEX idx_waitlist_user_type ON waitlist(user_type);

-- Update existing records to have default form_type
UPDATE waitlist 
SET form_type = 'waitlist' 
WHERE form_type IS NULL;

-- Optional: View the updated table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'waitlist'
ORDER BY ordinal_position; 