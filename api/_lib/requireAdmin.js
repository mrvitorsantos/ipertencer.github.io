const { supabase } = require('./supabase');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Check if user is admin in Membros table
  const { data, error: dbError } = await supabase
    .from('Membros')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  if (dbError || !data || !data.is_admin) {
    return res.status(403).json({ error: 'Access denied' });
  }

  req.user = user;
  if (next) next();
};
