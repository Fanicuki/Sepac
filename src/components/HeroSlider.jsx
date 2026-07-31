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
          <div style={styles.textContainer}>
            <h1 style={styles.logoGrande}>SEPAC</h1>
            <p style={styles.subtitulo}>{img.caption}</p>
            <button style={styles.btnContacto}>Conocer Disponibilidad</button>
          </div>
        </div>
      ))}

      {/* Flechas de Navegación Manual */}
      <button style={{ ...styles.flecha, left: '20px' }} onClick={anteriorImagen}>❮</button>
      <button style={{ ...styles.flecha, right: '20px' }} onClick={siguienteImagen}>❯</button>

      {/* Indicadores inferiores (Puntitos) */}
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
  btnContacto: {
    backgroundColor: '#ff6b00', // El color naranja solicitado
    color: '#ffffff',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.3s, transform 0.2s',
    boxShadow: '0 4px 15px rgba(255,107,0,0.4)',
    ':hover': { backgroundColor: '#e05e00' }
  },
  flecha: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    border: 'none',
    fontSize: '2rem',
    padding: '15px 20px',
    cursor: 'pointer',
    borderRadius: '50%',
    zIndex: 10,
    transition: 'background 0.3s',
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