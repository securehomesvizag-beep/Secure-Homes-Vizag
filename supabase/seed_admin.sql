-- Secure Home Vizag: Admin User Creation & Permission Grant
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/vmalhjzrbapjsxdhldvi/sql)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  target_user_id UUID;
BEGIN
  -- 1. Check if user already exists in auth.users
  SELECT id INTO target_user_id FROM auth.users WHERE email = 'admin@securehomevizag.com';

  -- 2. If user does not exist, create the account in auth.users
  IF target_user_id IS NULL THEN
    target_user_id := gen_random_uuid();
    
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      aud
    )
    VALUES (
      target_user_id,
      '00000000-0000-0000-0000-000000000000',
      'admin@securehomevizag.com',
      crypt('SecureHome@2026!', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Admin Secure Home"}'::jsonb,
      NOW(),
      NOW(),
      'authenticated',
      'authenticated'
    );
  ELSE
    -- If already exists, update password and ensure email is confirmed
    UPDATE auth.users
    SET
      encrypted_password = crypt('SecureHome@2026!', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
      updated_at = NOW()
    WHERE id = target_user_id;
  END IF;

  -- 3. Ensure admins table exists
  CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
  );

  -- 4. Register the admin ID in public.admins for RLS authorization
  INSERT INTO public.admins (id, email, full_name)
  VALUES (target_user_id, 'admin@securehomevizag.com', 'Admin Secure Home')
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email, full_name = EXCLUDED.full_name;

  RAISE NOTICE 'Admin user successfully configured with ID: %', target_user_id;
END $$;
