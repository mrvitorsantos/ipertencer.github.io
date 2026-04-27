import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${isAdmin ? 'admin-mode' : ''}`} id="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon"><i className="fa-solid fa-church"></i></span>
          <div className="logo-text">Igreja <span>Pertencer</span></div>
          {isAdmin && <span className="admin-badge">ADMIN</span>}
        </Link>

        <nav className="nav-links">
          <a href="/#palavra">Palavra do Dia</a>
          <a href="/#lives">Lives</a>
          <a href="/#cursos">Cursos</a>
          <Link to="/propagador">Links</Link>
          {isAdmin && <Link to="/admin" className="admin-link">Painel Admin</Link>}
        </nav>

        <div className="nav-actions">
          <div className="social-links">
            <a href="https://www.instagram.com/ipertencer/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/seunumerodecontato" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
          </div>

          {!user ? (
            <Link to="/login" className="btn btn-primary">Login/Cadastro</Link>
          ) : (
            <Link to="/perfil" className="btn btn-icon" style={{ fontSize: '1.8rem', color: '#00AEEF' }} title="Meu Perfil">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
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
          {isAdmin && <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ color: '#9333ea', fontWeight: 'bold' }}>Painel Admin</Link>}
          {!user ? (
            <Link to="/login" className="btn btn-primary btn-block" style={{ marginTop: '1rem' }}>Login/Cadastro</Link>
          ) : (
            <Link to="/perfil" className="btn btn-outline btn-block" style={{ marginTop: '1rem' }} onClick={() => setIsMenuOpen(false)}>
              <i className="fa-solid fa-circle-user"></i> Ver Perfil
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
