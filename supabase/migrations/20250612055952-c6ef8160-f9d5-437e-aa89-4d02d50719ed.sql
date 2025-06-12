
-- Add email notification preferences to profiles table
ALTER TABLE profiles 
ADD COLUMN email_notifications boolean DEFAULT true,
ADD COLUMN notification_days integer[] DEFAULT ARRAY[7, 1];
