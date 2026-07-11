-- Disable Row Level Security on the tables since the backend uses the public anon key
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;

-- If Supabase requires policies instead of disabling, you can run this instead:
DROP POLICY IF EXISTS "Allow all users" ON public.users;
CREATE POLICY "Allow all users" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all projects" ON public.projects;
CREATE POLICY "Allow all projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);
