// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  // Array de marcas asociadas (puedes reemplazar 'src' por las imágenes de tu proyecto)
  const marcas = [
    { id: 1, nombre: "Marca Agro 1", text: "EMPRESA-1" },
    { id: 2, nombre: "Marca Avia 2", text: "EMPRESA-2" },
    { id: 3, nombre: "Marca Ind 3", text: "EMPRESA-3" },
    { id: 4, nombre: "Marca 4", text: "EMPRESA-4" },
    { id: 5, nombre: "Marca 5", text: "EMPRESA-5" },
    { id: 6, nombre: "Marca 6", text: "EMPRESA-6" },
  ];

  // Duplicamos la lista para lograr el bucle visual sin cortes
  const marcasInfinitas = [...marcas, ...marcas];

  return (
    <footer style={styles.footerContainer}>
      {/* 1. SECCIÓN CARRUSEL INFINITO DE LOGOS */}
      <div style={styles.carruselSeccion}>
        <p style={styles.carruselTitulo}>EMPRESAS Y ORGANISMOS QUE CONFÍAN EN NOSOTROS</p>
        <div style={styles.marqueeWrapper} className="marquee-wrapper">
          <div style={styles.marqueeTrack} className="marquee-track">
            {marcasInfinitas.map((marca, idx) => (
              <div key={idx} style={styles.logoCard}>
                {/* Cuando tengas las imágenes, usas: <img src={marca.logoUrl} alt={marca.nombre} /> */}
                <span style={styles.logoPlaceholder}>{marca.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* 2. SECCIÓN PRINCIPAL DEL FOOTER (3 COLUMNAS) */}
      <div style={styles.footerMain}>
        {/* Columna 1: Branding y Descripción */}
        <div style={styles.columna}>
          <a href="/" style={styles.logoLink}>
            <div style={styles.logo}>
              SEPAC<span style={{ color: '#ff6b00' }}>.</span>
            </div>
          </a>
          <p style={styles.descripcion}>
            Soluciones integrales de alta tecnología en aviación, protección contra incendios, equipamiento agropecuario y sistemas aeroportuarios.
          </p>
        </div>

        {/* Columna 2: Contacto Directo */}
        <div style={styles.columna}>
          <h4 style={styles.colTitulo}>CONTACTO</h4>
          <ul style={styles.listaContacto}>
            <li style={styles.itemContacto}>
              <span style={styles.icono}>📍</span> Buenos Aires, Argentina
            </li>
            <li style={styles.itemContacto}>
              <span style={styles.icono}>📞</span> +54 (11) 1234-5678
            </li>
            <li style={styles.itemContacto}>
              <span style={styles.icono}>✉️</span> contacto@sepac.com.ar
            </li>
            <li style={styles.itemContacto}>
              <span style={styles.icono}>✉️</span> ventas@sepac.com.ar
            </li>
          </ul>
        </div>

        {/* Columna 3: Enlaces Rápidos */}
        <div style={styles.columna}>
          <h4 style={styles.colTitulo}>NAVEGACIÓN</h4>
          <ul style={styles.listaLinks}>
            <li><a href="/sobre-nosotros" style={styles.link}>Sobre Nosotros</a></li>
            <li><a href="#extincion" style={styles.link}>Extinción de Incendios</a></li>
            <li><a href="#aerodromos" style={styles.link}>Aeródromos y Helipuertos</a></li>
            <li><a href="/servicios" style={styles.link}>Servicios</a></li>
            <li><a href="/contacto" style={styles.link}>Contáctanos</a></li>
          </ul>
        </div>
      </div>

      {/* 3. BARRA DE COPYRIGHT FINAL */}
      <div style={styles.copyrightBar}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} SEPAC. Todos los derechos reservados.
        </p>
      </div>

      {/* CSS Inyectado para la animación infinitamente fluida */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 20s linear infinite;
        }

        /* Pausa suave al pasar el cursor sobre los logos */
        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }
      `}} />
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: '#111827', // Tono oscuro industrial profundo
    color: '#e2e8f0',
    fontFamily: 'sans-serif',
    paddingTop: '40px',
    borderTop: '3px solid #ff6b00',
  },
  carruselSeccion: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 30px 20px',
    textAlign: 'center',
  },
  carruselTitulo: {
    fontSize: '0.85rem',
    letterSpacing: '2px',
    color: '#94a3b8',
    fontWeight: '600',
    marginBottom: '25px',
  },
  marqueeWrapper: {
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
    // Máscara de desvanecimiento en los bordes izquierdo y derecho
    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  },
  marqueeTrack: {
    gap: '40px',
  },
  logoCard: {
    backgroundColor: '#1a202c',
    padding: '15px 30px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '160px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
  logoPlaceholder: {
    color: '#ff6b00',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    letterSpacing: '1px',
  },
  divider: {
    borderColor: 'rgba(255, 255, 255, 0.08)',
    margin: 0,
  },
  footerMain: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '50px 20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
  },
  columna: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoLink: {
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '15px',
  },
  logo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '1px',
  },
  descripcion: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    margin: 0,
  },
  colTitulo: {
    color: '#ffffff',
    fontSize: '1.1rem',
    marginBottom: '20px',
    position: 'relative',
    letterSpacing: '1px',
  },
  listaContacto: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  itemContacto: {
    color: '#cbd5e1',
    fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icono: {
    fontSize: '1rem',
  },
  listaLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    color: '#cbd5e1',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.2s',
  },
  copyrightBar: {
    backgroundColor: '#0b0f17',
    textAlign: 'center',
    padding: '20px',
    fontSize: '0.85rem',
    color: '#64748b',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
};