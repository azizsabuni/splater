-- Create the 'users' table
CREATE TABLE public.users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  passwordHash text NOT NULL,
  credits integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create the 'projects' table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL REFERENCES public.users(email) ON DELETE CASCADE,
  url text NOT NULL,
  description text,
  score integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Reload the schema cache just in case
NOTIFY pgrst, 'reload schema';
