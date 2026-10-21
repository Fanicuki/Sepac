// src/components/HeroSlider.jsx
import React, { useState, useEffect } from 'react';

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Imágenes de demostración de alta calidad (Maquinaria agrícola y Aviación)
  const imagenes = [
    {
      url: "https://images.unsplash.com/photo-1592965682824-879afa683ffee?w=1600&auto=format&fit=crop&q=80",
      caption: "Tecnología de Vanguardia en Maquinaria Agrícola"
    },
    {
      url: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1600&auto=format&fit=crop&q=80",
      caption: "Soluciones de Aviación e Infraestructura Global"
    }
  ];

  // Efecto para el auto-desplazamiento cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteImagen();
    }, 5000);

    return () => clearInterval(intervalo); // Limpieza del timer al desmontar
  }, [currentIndex]);

  const siguienteImagen = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imagenes.length - 1 : prevIndex - 1));
  };

  return (
    <div style={styles.sliderContainer}>
      {/* Imágenes en carrusel */}
      {imagenes.map((img, index) => (
        <div
          key={index}
          style={{
            ...styles.slide,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${img.url})`,
            opacity: index === currentIndex ? 1 : 0,
            visibility: index === currentIndex ? 'visible' : 'hidden',
          }}
        >
          {/* Contenedor del nombre de la empresa e información llamativa */}
          <div style={styles.textContainer} className="hero-texto">
            <h1 style={styles.logoGrande} className="hero-titulo">SEPAC</h1>
            <p style={styles.subtitulo} className="hero-subtitulo">{img.caption}</p>
          </div>
        </div>
      ))}

      <button type="button" className="hero-flecha hero-flecha--izq" onClick={anteriorImagen} aria-label="Imagen anterior">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M14.5 6.5 8.5 12l6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="hero-flecha hero-flecha--der" onClick={siguienteImagen} aria-label="Imagen siguiente">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9.5 6.5 15.5 12l-6 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Indicadores inferiores (Puntitos) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-flecha {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          padding: 0;
          color: #ffffff;
          background: rgba(15, 23, 42, 0.62);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 50%;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .hero-flecha--izq { left: 28px; }
        .hero-flecha--der { right: 28px; }

        .hero-flecha:hover {
          background: #ff6b00;
          border-color: #ff6b00;
          transform: translateY(-50%) scale(1.06);
        }

        .hero-flecha:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        @media (max-width: 640px) {
          .hero-flecha {
            width: 40px;
            height: 40px;
          }

          .hero-flecha svg {
            width: 18px;
            height: 18px;
          }

          .hero-flecha--izq { left: 12px; }
          .hero-flecha--der { right: 12px; }

          .hero-texto {
            padding-left: 58px !important;
            padding-right: 58px !important;
          }

          .hero-titulo {
            font-size: 2.8rem !important;
            letter-spacing: 0.12em !important;
          }

          .hero-subtitulo {
            font-size: 1.05rem !important;
          }
        }
      `}} />

      <div style={styles.dotsContainer}>
        {imagenes.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              ...styles.dot,
              backgroundColor: index === currentIndex ? '#ff6b00' : 'rgba(255,255,255,0.5)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  sliderContainer: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#000000',
    fontFamily: 'sans-serif',
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 1s ease-in-out, visibility 1s',
  },
  textContainer: {
    textAlign: 'center',
    color: '#ffffff',
    padding: '0 20px',
  },
  logoGrande: {
    fontSize: '5rem',
    fontWeight: '900',
    margin: 0,
    letterSpacing: '5px',
    textShadow: '2px 4px 10px rgba(0,0,0,0.5)',
  },
  subtitulo: {
    fontSize: '1.5rem',
    margin: '20px 0 30px 0',
    color: '#e2e8f0', // Grisáceo claro para combinar
    fontWeight: '300',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '30px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    zIndex: 10,
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }
};