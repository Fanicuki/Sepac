// src/components/HeroSlider.jsx
import React, { useEffect, useState } from 'react';

const imagenes = [
  {
    src: '/carrousel/1.jpeg',
    alt: 'Helipuerto del Hospital Garrahan con balizamiento nocturno',
    ancho: 1280,
    alto: 720,
    descripcion: 'Instalación de balizamiento y habilitación',
    logo: { src: '/logos/garrahan.jpg', alt: 'Hospital Garrahan' },
  },
  {
    src: '/carrousel/2.jpeg',
    alt: 'Práctica de extinción de incendios en el campo',
    ancho: 1280,
    alto: 854,
    descripcion: 'Práctica de extinción de incendios',
  },
  {
    src: '/carrousel/3.jpeg',
    alt: 'Helipuerto de Clínica San Agustín con balizamiento nocturno',
    ancho: 1600,
    alto: 1207,
    descripcion: 'Venta de balizamiento nocturno',
    logo: { src: '/logos/san-agustin.png', alt: 'Clínica San Agustín' },
  },
  {
    src: '/carrousel/4.jpeg',
    alt: 'Cosechadora trabajando en un campo de trigo',
    ancho: 1600,
    alto: 900,
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoEnEsquina, setLogoEnEsquina] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setLogoVisible(true);
      setLogoEnEsquina(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => setLogoVisible(true));
    const timer = window.setTimeout(() => setLogoEnEsquina(true), 1000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000);
    return () => window.clearInterval(intervalo);
  }, [currentIndex]);

  const siguienteImagen = () => {
    setCurrentIndex((prev) => (prev + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const claseLogo = [
    'hero-marca',
    logoVisible ? 'hero-marca--visible' : '',
    logoEnEsquina ? 'hero-marca--esquina' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className="hero" aria-roledescription="carrusel" aria-label="Trabajos de SEPAC">
      {imagenes.map((img, index) => {
        const activa = index === currentIndex;
        return (
          <figure
            key={img.src}
            className={activa ? 'hero-slide hero-slide--activa' : 'hero-slide'}
            aria-hidden={activa ? undefined : true}
          >
            <img
              className={`hero-foto hero-foto--${index + 1}`}
              src={img.src}
              alt={img.alt}
              width={img.ancho}
              height={img.alto}
              draggable={false}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
            {img.logo && (
              <img
                className="hero-cliente"
                src={img.logo.src}
                alt={img.logo.alt}
                draggable={false}
              />
            )}
            {img.descripcion && (
              <figcaption className="hero-descripcion">{img.descripcion}</figcaption>
            )}
          </figure>
        );
      })}

      <h1 className={claseLogo}>
        SEPAC<span>.</span>
      </h1>

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

      <div className="hero-puntos">
        {imagenes.map((img, index) => (
          <button
            key={img.src}
            type="button"
            className={index === currentIndex ? 'hero-punto hero-punto--activo' : 'hero-punto'}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Mostrar imagen ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: #101820;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          container-type: size;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1s ease-in-out, visibility 1s;
        }

        .hero-slide--activa {
          opacity: 1;
          visibility: visible;
          z-index: 1;
        }

        .hero-foto {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-foto--1 { object-position: center 46%; }
        .hero-foto--2 { object-position: 32% 48%; }
        .hero-foto--3 { object-position: center 34%; }
        .hero-foto--4 { object-position: center 58%; }

        .hero-marca {
          position: absolute;
          z-index: 8;
          top: 0;
          left: 0;
          margin: 0;
          font-size: clamp(2.7rem, 8vw, 4.6rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.14em;
          color: #ffffff;
          text-shadow:
            0 1px 2px rgba(0, 0, 0, 0.75),
            0 8px 22px rgba(0, 0, 0, 0.45);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          opacity: 0;
          filter: blur(14px);
          transform: translate(calc(50vw - 50%), calc(50dvh - 50%));
          transform: translate(calc(50cqw - 50%), calc(50cqh - 50%));
          transition:
            opacity 1s ease,
            filter 1s ease,
            transform 1.15s cubic-bezier(0.4, 0, 0.2, 1),
            font-size 1.15s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-marca span {
          color: #ff6b00;
        }

        .hero-marca--visible {
          opacity: 1;
          filter: blur(0);
        }

        .hero-marca--esquina {
          font-size: clamp(1.15rem, 2.4vw, 1.65rem);
          letter-spacing: 0.16em;
          transform: translate(calc(100vw - 100% - 28px), calc(75px + 16px));
          transform: translate(calc(100cqw - 100% - 28px), calc(75px + 16px));
        }

        .hero-cliente {
          position: absolute;
          z-index: 6;
          top: calc(75px + 16px);
          left: clamp(16px, 2.6vw, 28px);
          height: clamp(46px, 8vh, 66px);
          width: auto;
          max-width: min(118px, 30vw);
          object-fit: contain;
          padding: 5px 7px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.58);
          opacity: 0.78;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.16);
          pointer-events: none;
        }

        .hero-descripcion {
          position: absolute;
          z-index: 6;
          left: clamp(16px, 3vw, 36px);
          bottom: clamp(52px, 7vh, 68px);
          max-width: min(250px, calc(100% - 96px));
          margin: 0;
          padding: 7px 11px;
          color: #f8fafc;
          font-size: clamp(0.74rem, 1.35vw, 0.9rem);
          font-weight: 500;
          line-height: 1.35;
          letter-spacing: 0.01em;
          background: rgba(15, 23, 42, 0.46);
          border-radius: 8px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

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

        .hero-flecha:focus-visible,
        .hero-punto:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
        }

        .hero-puntos {
          position: absolute;
          z-index: 10;
          left: 0;
          right: 0;
          bottom: 20px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .hero-punto {
          width: 10px;
          height: 10px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
        }

        .hero-punto--activo {
          background: #ff6b00;
        }

        @media (max-width: 760px) and (orientation: portrait) {
          .hero {
            height: auto;
            aspect-ratio: 4 / 5;
          }
        }

        @media (max-width: 760px) {
          .hero-foto--1 { object-position: center 40%; }
          .hero-foto--2 { object-position: 24% 46%; }
          .hero-foto--3 { object-position: 46% 32%; }
          .hero-foto--4 { object-position: center 50%; }

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

          .hero-marca--esquina {
            transform: translate(calc(100vw - 100% - 16px), calc(75px + 12px));
            transform: translate(calc(100cqw - 100% - 16px), calc(75px + 12px));
          }

          .hero-cliente {
            top: calc(75px + 12px);
            left: 16px;
          }

          .hero-descripcion {
            left: 14px;
            bottom: 48px;
            max-width: min(210px, calc(100% - 28px));
          }
        }

        @media (max-aspect-ratio: 3/4) {
          .hero-foto--2 { object-position: 12% 48%; }
          .hero-foto--3 { object-position: 42% 34%; }
        }

        @media (max-height: 520px) {
          .hero-cliente {
            height: 40px;
            top: calc(75px + 10px);
          }

          .hero-descripcion {
            bottom: 42px;
            font-size: 0.72rem;
            padding: 5px 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide,
          .hero-marca,
          .hero-flecha {
            transition: none;
          }

          .hero-marca {
            opacity: 1;
            filter: none;
            font-size: clamp(1.15rem, 2.4vw, 1.65rem);
            transform: translate(calc(100vw - 100% - 28px), calc(75px + 16px));
            transform: translate(calc(100cqw - 100% - 28px), calc(75px + 16px));
          }
        }
      `}} />
    </section>
  );
}
