// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estructura de menú
  const opcionesMenu = [
    {
      titulo: "Sobre Nosotros",
      link: "#sobre-nosotros" 
    },
    {
      titulo: "Extinción de Incendios",
      items: ["SEPAC AGRO", "SEPAC INDUSTRIAL", "SEPAC NÁUTICO"]
    },
    {
      titulo: "Aeródromos/Helipuertos",
      items: ["AMG AYUDAS VISUALES", "KIT DE SALVAMENTO", "SEI"]
    },
    {
      titulo: "Servicios",
      link: "#servicios" 
    },
    {
      titulo: "Contáctanos",
      link: "#contacto" 
    }
  ];

  const navBackground = scrolled 
    ? 'rgba(26, 32, 44, 0.95)' 
    : 'rgba(26, 32, 44, 0.3)';  

  return (
    <nav style={{ ...styles.nav, backgroundColor: navBackground }}>
      <div style={styles.navContainer}>
        {/* Logo */}
        <div style={styles.logo}>
          SEPAC<span style={{ color: '#ff6b00' }}>.</span>
        </div>

        {/* Botón menú hamburguesa (oculto en computadoras) */}
        <button style={styles.menuToggle} onClick={() => setMenuAbierto(!menuAbierto)}>
          {menuAbierto ? '✕' : '☰'}
        </button>

        {/* Contenedor de enlaces */}
        <ul style={styles.navLinks} className={`nav-menu-desktop ${menuAbierto ? 'mobile-abierto' : ''}`}>
          {opcionesMenu.map((opcion, index) => {
            const tieneSubMenu = opcion.items && opcion.items.length > 0;

            return (
              <li key={index} style={styles.navItem} className={tieneSubMenu ? "dropdown-group" : "simple-group"}>
                {/* Si tiene sub-menú renderiza un span, si no, un enlace direct (<a>) */}
                {tieneSubMenu ? (
                  <span style={styles.linkTitulo} className="menu-title">
                    {opcion.titulo}
                  </span>
                ) : (
                  <a href={opcion.link || "#"} style={styles.linkTituloSimple} className="menu-title">
                    {opcion.titulo}
                  </a>
                )}
                
                {/* Cajita Desplegable Vertical: SOLO se renderiza si 'items' existe */}
                {tieneSubMenu && (
                  <ul style={styles.dropdown} className="dropdown-menu">
                    {opcion.items.map((item, subIndex) => (
                      <li key={subIndex} style={styles.dropdownItem}>
                        <a href="#" style={styles.dropdownLink}>{item}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* CSS inyectado para asegurar el comportamiento horizontal en escritorio y el hover de subrayado */}
      <style dangerouslySetInnerHTML={{__html: `
        /* PANTALLAS DE COMPUTADORA */
        @media (min-width: 769px) {
          .nav-menu-desktop {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
          }

          /* Muestra el dropdown vertical al pasar el cursor SOLO en los que tienen sub-menú */
          .dropdown-group:hover .dropdown-menu {
            display: block !important;
            opacity: 1;
            visibility: visible;
          }
          
          /* Animación del subrayado naranja al pasar el cursor (Aplica para ambos tipos de menú) */
          .dropdown-group:hover .menu-title,
          .simple-group:hover .menu-title {
            color: #ff6b00 !important;
          }
          .dropdown-group:hover .menu-title::after,
          .simple-group:hover .menu-title::after {
            width: 100% !important;
          }
        }

        /* PANTALLAS MÓVILES (Celulares / Tablets) */
        @media (max-width: 768px) {
          .nav-menu-desktop {
            display: none;
            flex-direction: column !important;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #1a202c;
            padding: 20px 0;
            gap: 15px;
          }
          .mobile-abierto {
            display: flex !important;
          }
          .dropdown-menu {
            position: relative !important;
            display: block !important;
            box-shadow: none !important;
            background: rgba(26, 32, 44, 0.5) !important;
            padding-left: 20px !important;
            border-top: none !important;
            transform: none !important;
            left: 0 !important;
          }
        }
      `}} />
    </nav>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    color: '#ffffff',
    zIndex: 1000,
    transition: 'background-color 0.4s ease',
    fontFamily: 'sans-serif',
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 20px',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  menuToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '2rem',
    cursor: 'pointer',
  },
  navLinks: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '35px',
    marginLeft: 'auto',
  },
  navItem: {
    position: 'relative',
    padding: '10px 0',
  },
  linkTitulo: {
    position: 'relative',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1.05rem',
    color: '#ffffff',
    transition: 'color 0.3s ease',
    display: 'inline-block',
    paddingBottom: '4px',
  },
  linkTituloSimple: {
    position: 'relative',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1.05rem',
    color: '#ffffff',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    display: 'inline-block',
    paddingBottom: '4px',
  },
  dropdown: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1a202c', 
    listStyle: 'none',
    padding: '10px 0',
    margin: 0,
    minWidth: '200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    borderRadius: '4px',
    borderTop: '3px solid #ff6b00',
  },
  dropdownItem: {
    padding: '0',
  },
  dropdownLink: {
    display: 'block',
    padding: '10px 20px',
    color: '#e2e8f0',
    textDecoration: 'none',
    fontWeight: '400',
    fontSize: '0.95rem',
    transition: 'background 0.2s, color 0.2s',
  },
};