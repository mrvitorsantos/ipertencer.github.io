import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Deseja realmente sair da sua conta?")) {
      await supabase.auth.signOut();
      navigate('/');
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon"><i className="fa-solid fa-church"></i></span>
          <div className="logo-text">Igreja <span>Pertencer</span></div>
        </Link>

        <nav className="nav-links">
          <a href="/#palavra">Palavra do Dia</a>
          <a href="/#lives">Lives</a>
          <a href="/#cursos">Cursos</a>
          <Link to="/propagador">Links</Link>
        </nav>

        <div className="nav-actions">
          <div className="social-links">
            <a href="https://www.instagram.com/ipertencer/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/seunumerodecontato" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          </div>

          {!session ? (
            <Link to="/login" className="btn btn-primary">Login/Cadastro</Link>
          ) : (
            <button className="btn btn-icon" onClick={handleLogout} style={{ fontSize: '1.8rem', color: '#00AEEF' }} title="Sair da Conta">
              <i className="fa-solid fa-user-circle"></i>
            </button>
          )}

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <nav className="mobile-nav-links">
          <a href="/#palavra" onClick={() => setIsMenuOpen(false)}>Palavra do Dia</a>
          <a href="/#lives" onClick={() => setIsMenuOpen(false)}>Lives</a>
          <a href="/#cursos" onClick={() => setIsMenuOpen(false)}>Cursos</a>
          <Link to="/propagador" onClick={() => setIsMenuOpen(false)}>Links</Link>
          {!session ? (
            <Link to="/login" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>Login/Cadastro</Link>
          ) : (
            <button className="btn btn-outline btn-block" style={{ marginTop: '1rem' }} onClick={handleLogout}>
              <i className="fa-solid fa-user-circle"></i> Sair da Conta
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
