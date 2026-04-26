import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    nome: '',
    whatsapp: '',
    nascimento: '',
    batizado: ''
  });
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      // Busca dados na tabela Membros
      const { data, error } = await supabase
        .from('Membros')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setProfile({
          nome: data.nome || '',
          whatsapp: data.whatsapp || '',
          nascimento: data.nascimento || '',
          batizado: data.batizado || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('Membros')
        .update({
          nome: profile.nome,
          whatsapp: profile.whatsapp,
          nascimento: profile.nascimento
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil: ' + error.message);
    } finally {
      setUpdating(false);
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) {
    return <div className="loading-screen"><i className="fa-solid fa-circle-notch fa-spin"></i></div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container glass-card">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <h3>{profile.nome || 'Membro'}</h3>
            <p>{user?.email}</p>
          </div>

          <nav className="profile-nav">
            <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}>
              <i className="fa-solid fa-id-card"></i> Meu Perfil
            </button>
            <button className={activeTab === 'cursos' ? 'active' : ''} onClick={() => setActiveTab('cursos')}>
              <i className="fa-solid fa-graduation-cap"></i> Meus Cursos
            </button>
            <button className={activeTab === 'pagamento' ? 'active' : ''} onClick={() => setActiveTab('pagamento')}>
              <i className="fa-solid fa-credit-card"></i> Financeiro
            </button>
            <button className={activeTab === 'config' ? 'active' : ''} onClick={() => setActiveTab('config')}>
              <i className="fa-solid fa-gear"></i> Configurações
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Sair da Conta
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="profile-content">
          {activeTab === 'perfil' && (
            <div className="tab-pane">
              <h2>Editar Perfil</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nome Completo</label>
                  <input 
                    type="text" 
                    value={profile.nome} 
                    onChange={(e) => setProfile({...profile, nome: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input 
                    type="tel" 
                    value={profile.whatsapp} 
                    onChange={(e) => setProfile({...profile, whatsapp: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input 
                    type="date" 
                    value={profile.nascimento} 
                    onChange={(e) => setProfile({...profile, nascimento: e.target.value})}
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={updateProfile} disabled={updating}>
                {updating ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}

          {activeTab === 'cursos' && (
            <div className="tab-pane">
              <h2>Progresso nos Cursos</h2>
              <div className="courses-list">
                <div className="course-item">
                  <div className="course-info">
                    <h4>Discipulado Nível 1</h4>
                    <span>75% completo</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="course-item">
                  <div className="course-info">
                    <h4>Liderança Cristã</h4>
                    <span>30% completo</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pagamento' && (
            <div className="tab-pane">
              <h2>Formas de Pagamento</h2>
              <div className="payment-card">
                <div className="card-header">
                  <i className="fa-brands fa-cc-mastercard"></i>
                  <span>Cartão Principal</span>
                </div>
                <div className="card-number">**** **** **** 4455</div>
                <button className="btn btn-outline btn-sm">Atualizar Cartão</button>
              </div>
              <div className="donation-history">
                <h3>Histórico de Contribuições</h3>
                <p style={{ color: '#a1a1aa' }}>Nenhuma contribuição registrada este mês.</p>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="tab-pane">
              <h2>Configurações de Segurança</h2>
              <div className="settings-options">
                <div className="setting-item">
                  <div>
                    <h4>Alterar Senha</h4>
                    <p>Mude sua senha de acesso periodicamente.</p>
                  </div>
                  <button className="btn btn-outline">Alterar</button>
                </div>
                <div className="setting-item">
                  <div>
                    <h4>Autenticação em duas etapas</h4>
                    <p>Adicione uma camada extra de proteção.</p>
                  </div>
                  <button className="btn btn-outline">Ativar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
