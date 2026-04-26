import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CoursePlayer.css';

const CoursePlayer = () => {
  const { id } = useParams();
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [activeTab, setActiveTab] = useState('apoio');

  // Dados mockados para estruturar a página
  const courseData = {
    title: "Discipulado Nível 1: Fundamentos",
    modules: [
      {
        title: "Módulo 1: Introdução à Fé",
        lessons: [
          { title: "01. O que é ser cristão?", duration: "12:45", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { title: "02. A importância da oração", duration: "15:20", videoUrl: "" },
          { title: "03. Conhecendo a Bíblia", duration: "22:10", videoUrl: "" }
        ]
      },
      {
        title: "Módulo 2: Vida em Comunidade",
        lessons: [
          { title: "04. O corpo de Cristo", duration: "18:30", videoUrl: "" },
          { title: "05. Servir com amor", duration: "14:15", videoUrl: "" }
        ]
      }
    ]
  };

  const currentLesson = courseData.modules[activeModule].lessons[activeLesson];

  return (
    <div className="player-page">
      {/* Header do Player */}
      <header className="player-header">
        <Link to="/perfil" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i> Voltar ao Painel
        </Link>
        <div className="course-title-header">
          <h1>{courseData.title}</h1>
          <span className="lesson-badge">Aula {activeLesson + 1} de 5</span>
        </div>
      </header>

      <div className="player-main-container">
        {/* Lado Esquerdo: Vídeo e Conteúdo */}
        <div className="player-content">
          <div className="video-wrapper glass-card">
            <iframe 
              src={currentLesson.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="lesson-details">
            <div className="lesson-header">
              <h2>{currentLesson.title}</h2>
              <button className="complete-btn">
                <i className="fa-solid fa-check"></i> Concluir Aula
              </button>
            </div>

            <div className="content-tabs">
              <nav className="tab-nav">
                <button className={activeTab === 'desc' ? 'active' : ''} onClick={() => setActiveTab('desc')}>Descrição</button>
                <button className={activeTab === 'apoio' ? 'active' : ''} onClick={() => setActiveTab('apoio')}>Material de Apoio</button>
                <button className={activeTab === 'ativ' ? 'active' : ''} onClick={() => setActiveTab('ativ')}>Atividades</button>
              </nav>

              <div className="tab-content glass-card">
                {activeTab === 'desc' && (
                  <div className="tab-pane">
                    <p>Nesta aula, exploraremos os fundamentos da fé cristã e como ela transforma nossa visão de mundo.</p>
                  </div>
                )}
                {activeTab === 'apoio' && (
                  <div className="tab-pane">
                    <ul className="resource-list">
                      <li>
                        <i className="fa-solid fa-file-pdf"></i>
                        <div>
                          <span>Guia de Estudos - Aula 01</span>
                          <small>PDF (2.4 MB)</small>
                        </div>
                        <a href="#" className="download-icon"><i className="fa-solid fa-download"></i></a>
                      </li>
                      <li>
                        <i className="fa-solid fa-file-lines"></i>
                        <div>
                          <span>Versículos para Meditação</span>
                          <small>Documento de texto</small>
                        </div>
                        <a href="#" className="download-icon"><i className="fa-solid fa-download"></i></a>
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === 'ativ' && (
                  <div className="tab-pane">
                    <div className="activity-card">
                      <h4><i className="fa-solid fa-pen-to-square"></i> Exercício de Fixação</h4>
                      <p>Responda às questões abaixo para validar seu conhecimento sobre esta aula.</p>
                      <button className="btn btn-primary btn-sm">Iniciar Atividade</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Sidebar de Navegação */}
        <aside className="player-sidebar glass-card">
          <div className="sidebar-header">
            <h3>Conteúdo do Curso</h3>
            <div className="progress-info">
              <span>20% concluído</span>
              <div className="mini-progress"><div className="fill" style={{ width: '20%' }}></div></div>
            </div>
          </div>

          <div className="module-list">
            {courseData.modules.map((module, mIdx) => (
              <div key={mIdx} className="module-item">
                <div className="module-title" onClick={() => setActiveModule(mIdx)}>
                  <span>{module.title}</span>
                  <i className={`fa-solid fa-chevron-${activeModule === mIdx ? 'up' : 'down'}`}></i>
                </div>
                {activeModule === mIdx && (
                  <div className="lesson-list">
                    {module.lessons.map((lesson, lIdx) => (
                      <div 
                        key={lIdx} 
                        className={`lesson-item ${activeLesson === lIdx ? 'active' : ''}`}
                        onClick={() => setActiveLesson(lIdx)}
                      >
                        <i className={`fa-solid ${activeLesson > lIdx ? 'fa-circle-check' : 'fa-circle-play'}`}></i>
                        <div className="lesson-info">
                          <span>{lesson.title}</span>
                          <small>{lesson.duration}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayer;
