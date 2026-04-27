const requireAdmin = require('../_lib/requireAdmin');
const { supabase } = require('../_lib/supabase');

module.exports = async (req, res) => {
  // Apply middleware
  await requireAdmin(req, res, async () => {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('Membros')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      // Logic for updating/creating member via admin
      const { id, updates } = req.body;
      const { data, error } = await supabase
        .from('Membros')
        .update(updates)
        .eq('id', id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  });
};
