import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const location = useLocation();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [batismo, setBatismo] = useState('');

  useEffect(() => {
    // Check if redirect to register
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'register') {
      setIsLogin(false);
    }

    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/');
    });
  }, [location, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage({ type: 'error', text: 'E-mail ou senha incorretos.' });
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { name, phone, birth, batismo } 
      }
    });

    if (error) {
      setMessage({ type: 'error', text: 'Erro no cadastro: ' + error.message });
      setLoading(false);
    } else {
      setMessage({ type: 'success', text: '✅ Cadastro realizado! Verifique seu e-mail.' });
      setLoading(false);
      setTimeout(() => setIsLogin(true), 3000);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="btn-back"><i className="fa-solid fa-arrow-left"></i> Voltar</Link>
      <div className="login-overlay"></div>
      
      <div className="login-container glass-card">
        <Link to="/" className="logo">
          <span className="logo-icon"><i className="fa-solid fa-church"></i></span>
          <div className="logo-text">Igreja <span>Pertencer</span></div>
        </Link>

        {message.text && (
          <div className={`auth-alert ${message.type}`}>
            {message.text}
          </div>
        )}

        {isLogin ? (
          <div id="login-section">
            <h2 style={{ marginBottom: '0.5rem' }}>Área do Membro</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '2rem', fontSize: '0.95rem' }}>Faça login para acessar a plataforma</p>
            
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <div className="login-options">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: 'auto' }} /> Lembrar-me
                </label>
                <a href="#">Esqueceu a senha?</a>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Aguarde...</> : <>Entrar <i className="fa-solid fa-arrow-right"></i></>}
              </button>
            </form>
            
            <div className="toggle-form">
              Ainda não tem cadastro? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Criar uma conta</a>
            </div>
          </div>
        ) : (
          <div id="register-section">
            <h2 style={{ marginBottom: '0.5rem' }}>Seja um Membro</h2>
            <p style={{ color: '#a1a1aa', marginBottom: '2rem', fontSize: '0.95rem' }}>Preencha os dados abaixo. Nossa secretaria entrará em contato.</p>
            
            <form className="login-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nome Completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Seu nome completo" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="(00) 00000-0000" />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input type="date" value={birth} onChange={(e) => setBirth(e.target.value)} required />
                </div>
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="seu@email.com" />
              </div>
              <div className="form-group">
                <label>Senha</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Crie uma senha" />
              </div>
              <div className="form-group">
                <label>Você já é batizado(a)?</label>
                <select value={batismo} onChange={(e) => setBatismo(e.target.value)} required style={{ width: '100%', padding: '0.9rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white' }}>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="sim">Sim, na Igreja Pertencer</option>
                  <option value="sim-outra">Sim, em outra igreja</option>
                  <option value="nao">Ainda não</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Aguarde...</> : <>Enviar Cadastro <i className="fa-solid fa-paper-plane"></i></>}
              </button>
            </form>
            
            <div className="toggle-form">
              Já possui uma conta? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Fazer Login</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
