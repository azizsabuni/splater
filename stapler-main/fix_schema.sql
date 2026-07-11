ALTER TABLE public.users RENAME COLUMN passwordhash TO "passwordHash";
NOTIFY pgrst, 'reload schema';
