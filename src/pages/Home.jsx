import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.section-header, .live-card, .curso-card, .verse-card');
    elements.forEach(el => {
      el.classList.add('reveal-item');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="animate-up">Bem-vindo à sua<br />nova <span>família</span>.</h1>
          <p className="animate-up delay-1">Um lugar de amor, graça e transformação. Faça parte da Igreja Pertencer.</p>
          <div className="hero-buttons animate-up delay-2">
            <Link to="/login?tab=register" className="btn btn-primary btn-large">Quero Fazer Parte</Link>
            <a href="#lives" className="btn btn-outline btn-large">Culto ao Vivo <i className="fa-solid fa-play"></i></a>
          </div>
        </div>
      </section>

      {/* Palavra do Dia */}
      <section className="section palavra-section" id="palavra">
        <div className="container">
          <div className="section-header">
            <h2>Palavra do Dia</h2>
            <div className="line"></div>
          </div>

          <div className="verse-card glass-card">
            <i className="fa-solid fa-quote-left quote-icon"></i>
            <blockquote id="daily-verse">
              "Mas os que esperam no Senhor renovarão as suas forças. Subirão com asas como águias; correrão, e
              não se cansarão; caminharão, e não se fatigarão."
            </blockquote>
            <cite id="daily-reference">- Isaías 40:31</cite>
            <button className="btn btn-icon btn-share" onClick={() => {
                const text = document.getElementById('daily-verse').innerText + " - Isaías 40:31 - Igreja Pertencer";
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
            }}>
              <i className="fa-brands fa-whatsapp"></i> Compartilhar
            </button>
          </div>
        </div>
      </section>

      {/* Lives */}
      <section className="section lives-section" id="lives">
        <div className="container">
          <div className="section-header text-center">
            <h2>Nossas Lives</h2>
            <p>Acompanhe nossos cultos de onde estiver</p>
            <div className="line center"></div>
          </div>

          <div className="lives-grid">
            <div className="live-card live-now">
              <div className="live-thumbnail">
                <div className="badge-live">AO VIVO</div>
                <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Culto ao Vivo" />
                <div className="play-overlay"><i className="fa-solid fa-play"></i></div>
              </div>
              <div className="live-info">
                <h3>Culto de Celebração</h3>
                <p>Domingo - 18:00</p>
              </div>
            </div>

            <div className="live-card">
              <div className="live-thumbnail">
                <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Culto Anterior" />
                <div className="play-overlay"><i className="fa-solid fa-play"></i></div>
              </div>
              <div className="live-info">
                <h3>Culto de Ensino</h3>
                <p>Quarta-feira - 20:00</p>
              </div>
            </div>

            <div className="live-card">
              <div className="live-thumbnail">
                <img src="https://images.unsplash.com/photo-1478147427282-58a87a120781?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Culto de Jovens" />
                <div className="play-overlay"><i className="fa-solid fa-play"></i></div>
              </div>
              <div className="live-info">
                <h3>Rede de Jovens</h3>
                <p>Sábado - 19:30</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-outline"><i className="fa-brands fa-youtube"></i> Ver Canal no YouTube</a>
          </div>
        </div>
      </section>

      {/* Cursos de Discipulado */}
      <section className="section cursos-section" id="cursos">
        <div className="container">
          <div className="section-header">
            <h2>Cursos de Discipulado</h2>
            <p>Cresça no conhecimento e na graça</p>
            <div className="line"></div>
          </div>

          <div className="cursos-grid">
            <div className="curso-card">
              <div className="curso-icon"><i className="fa-solid fa-seedling"></i></div>
              <h3>Primeiros Passos</h3>
              <p>Ideal para novos convertidos. Aprenda os fundamentos da fé cristã e como iniciar sua caminhada com Jesus.</p>
              <a href="#" className="curso-link">Saiba Mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="curso-card">
              <div className="curso-icon"><i className="fa-solid fa-book-bible"></i></div>
              <h3>Maturidade Espiritual</h3>
              <p>Aprofunde-se nas escrituras, aprenda sobre os dons do Espírito Santo e descubra o seu chamado.</p>
              <a href="#" className="curso-link">Saiba Mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>

            <div className="curso-card">
              <div className="curso-icon"><i className="fa-solid fa-users"></i></div>
              <h3>Liderança e Serviço</h3>
              <p>Preparação para servir no ministério, liderar pequenos grupos e influenciar pessoas para o Reino.</p>
              <a href="#" className="curso-link">Saiba Mais <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
