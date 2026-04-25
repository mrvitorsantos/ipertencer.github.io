import React, { useEffect } from 'react';
import './Propagador.css';

import { Link } from 'react-router-dom';

const Propagador = () => {
  useEffect(() => {
    // Floating particles
    const container = document.getElementById('particles');
    if (container && container.childNodes.length === 0) {
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
        p.style.animationDuration = (Math.random() * 12 + 8) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        p.style.background = Math.random() > 0.5 ? '#00AEEF' : 'rgba(0,174,239,0.5)';
        container.appendChild(p);
      }
    }

    // Ripple effect on cards
    const handleRipple = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };

    const cards = document.querySelectorAll('.link-card');
    cards.forEach(card => card.addEventListener('click', handleRipple));

    return () => {
      cards.forEach(card => card.removeEventListener('click', handleRipple));
    };
  }, []);

  return (
    <div className="propagador-body">
      <div className="particles" id="particles"></div>

      <div className="wrapper">
        {/* Avatar */}
        <div className="avatar-ring">
          <div className="avatar-inner">
            <i className="fa-solid fa-church"></i>
          </div>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <h1 className="profile-name">Igreja Pertencer</h1>
          <span className="profile-badge"><i className="fa-solid fa-star"></i> Comunidade Oficial</span>
        </div>

        {/* Bio */}
        <p className="profile-bio">
          Uma família para pertencer. 💙<br />
          Acompanhe nossa comunidade nas redes sociais e fique por dentro de tudo!
        </p>

        <div className="divider">Nossos Canais</div>

        {/* Links */}
        <div className="links-list">
          {/* WhatsApp */}
          <a className="link-card card-whatsapp" href="https://wa.me/seunumerodecontato" target="_blank" rel="noopener" id="btn-whatsapp">
            <div className="card-icon">
              <i className="fa-brands fa-whatsapp" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Fale conosco</span>
              <span className="card-title">WhatsApp da Igreja</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </a>

          {/* Instagram */}
          <a className="link-card card-instagram" href="https://www.instagram.com/ipertencer/" target="_blank" rel="noopener" id="btn-instagram">
            <div className="card-icon" style={{ background: 'linear-gradient(135deg,#f58529,#dd2a7b,#8134af)' }}>
              <i className="fa-brands fa-instagram" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Nos siga</span>
              <span className="card-title">@ipertencer</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </a>

          {/* YouTube */}
          <a className="link-card card-youtube" href="https://youtube.com" target="_blank" rel="noopener" id="btn-youtube">
            <div className="card-icon">
              <i className="fa-brands fa-youtube" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Assista online</span>
              <span className="card-title">Canal no YouTube</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </a>

          {/* Facebook */}
          <a className="link-card card-facebook" href="https://facebook.com" target="_blank" rel="noopener" id="btn-facebook">
            <div className="card-icon">
              <i className="fa-brands fa-facebook-f" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Curta nossa página</span>
              <span className="card-title">Facebook</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </a>

          {/* Telegram */}
          <a className="link-card card-telegram" href="https://t.me/igrejapertencer" target="_blank" rel="noopener" id="btn-telegram">
            <div className="card-icon">
              <i className="fa-brands fa-telegram" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Grupo oficial</span>
              <span className="card-title">Telegram</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </a>

          {/* Culto Online */}
          <Link className="link-card card-culto" to="/#lives" id="btn-culto">
            <div className="card-icon">
              <i className="fa-solid fa-video" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Ao vivo</span>
              <span className="card-title">Assistir Culto Online</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </Link>

          {/* Site */}
          <Link className="link-card card-site" to="/" role="button" aria-label="Acessar o Site Oficial" id="btn-site">
            <div className="card-icon">
              <i className="fa-solid fa-globe" style={{ color: '#fff' }}></i>
            </div>
            <div className="card-text">
              <span className="card-label">Acesse</span>
              <span className="card-title">Nosso Site Oficial</span>
            </div>
            <i className="fa-solid fa-chevron-right card-arrow"></i>
          </Link>
        </div>

        {/* Footer */}
        <Link className="footer-link" to="/">
          <i className="fa-solid fa-church"></i>
          Igreja Pertencer &copy; 2026
        </Link>
      </div>
    </div>
  );
};

export default Propagador;
