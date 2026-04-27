import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminPanel.css';

const AdminPanel = () => {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembros: 0,
    totalBatizados: 0,
    novosEsteMes: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('Membros')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembros(data);

      // Calcular estatísticas simples
      const batizados = data.filter(m => m.batizado === 'sim' || m.batizado === 'sim-outra').length;
      
      setStats({
        totalMembros: data.length,
        totalBatizados: batizados,
        novosEsteMes: data.length // Simplificado
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdmin = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('Membros')
        .update({ is_admin: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      fetchData();
    } catch (error) {
      alert('Erro ao atualizar status: ' + error.message);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <h1>Painel Administrativo</h1>
          <p>Gerenciamento de membros e plataforma</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card glass-card">
            <i className="fa-solid fa-users"></i>
            <div>
              <h3>{stats.totalMembros}</h3>
              <p>Total de Membros</p>
            </div>
          </div>
          <div className="stat-card glass-card">
            <i className="fa-solid fa-droplet"></i>
            <div>
              <h3>{stats.totalBatizados}</h3>
              <p>Batizados</p>
            </div>
          </div>
          <div className="stat-card glass-card">
            <i className="fa-solid fa-user-plus"></i>
            <div>
              <h3>{stats.novosEsteMes}</h3>
              <p>Novos Membros</p>
            </div>
          </div>
        </div>

        <div className="membros-section glass-card">
          <div className="section-header">
            <h2>Membros Cadastrados</h2>
            <button className="btn btn-primary btn-sm" onClick={fetchData}>
              <i className="fa-solid fa-rotate"></i> Atualizar
            </button>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>WhatsApp</th>
                  <th>Batizado</th>
                  <th>Admin</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {membros.map(membro => (
                  <tr key={membro.id}>
                    <td>{membro.nome}</td>
                    <td>{membro.email}</td>
                    <td>{membro.whatsapp}</td>
                    <td>
                      <span className={`badge ${membro.batizado.startsWith('sim') ? 'success' : 'warning'}`}>
                        {membro.batizado.startsWith('sim') ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td>
                      <label className="switch">
                        <input 
                          type="checkbox" 
                          checked={membro.is_admin || false} 
                          onChange={() => toggleAdmin(membro.id, membro.is_admin)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td>
                      <button className="btn-icon" title="Editar"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button className="btn-icon delete" title="Excluir"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
