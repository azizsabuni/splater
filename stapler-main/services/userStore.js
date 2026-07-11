const { supabase } = require("./supabaseClient");
const { v4: uuidv4 } = require("crypto"); // fallback or we can just use native UUID if available, or rely on supabase.

async function createUser({ name, email, passwordHash, credits = 0 }) {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, passwordHash, credits }])
    .select()
    .single();

  if (error) {
    console.error("Error creating user in Supabase:", error);
    throw new Error(error.message);
  }
  return data;
}

async function findByName(name) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) return null;
  return data;
}

async function findByEmail(email) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) return null;
  return data;
}

async function deductCredits(email, amount) {
  if (!supabase) return false;
  
  const user = await findByEmail(email);
  if (user && user.credits >= amount) {
    const { data, error } = await supabase
      .from('users')
      .update({ credits: user.credits - amount })
      .eq('email', email)
      .select()
      .single();
      
    if (error) return false;
    return true;
  }
  return false;
}

module.exports = { createUser, findByName, findByEmail, deductCredits };
