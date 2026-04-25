import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link to="/" className="logo footer-logo">
            <span className="logo-icon"><i className="fa-solid fa-church"></i></span>
            <div className="logo-text">Igreja <span>Pertencer</span></div>
          </Link>
          <p>Nossa missão é amar a Deus e amar as pessoas, fazendo discípulos em todas as nações.</p>
          <div className="social-links footer-social" style={{ display: 'flex' }}>
            <a href="https://www.instagram.com/ipertencer/" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://wa.me/seunumerodecontato" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Acesso Rápido</h3>
          <ul>
            <li><a href="/#palavra">Palavra do Dia</a></li>
            <li><a href="/#lives">Cultos Online</a></li>
            <li><a href="/#cursos">Discipulado</a></li>
            <li><Link to="/login?tab=register">Seja Membro</Link></li>
            <li><Link to="/propagador">Nossos Canais</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Horários de Culto</h3>
          <ul>
            <li><strong>Domingo:</strong> 18:00 (Celebração)</li>
            <li><strong>Quarta:</strong> 20:00 (Ensino)</li>
            <li><strong>Sábado:</strong> 19:30 (Jovens)</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Igreja Pertencer. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
