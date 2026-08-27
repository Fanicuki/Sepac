// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submenuesAbiertos, setSubmenuesAbiertos] = useState({});

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

  // Bloquear el scroll de la página cuando el cajón móvil esté abierto
  useEffect(() => {
    if (menuAbierto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuAbierto]);

  // Alternar apertura de submenús en modo celular
  const toggleSubmenuMobile = (index) => {
    setSubmenuesAbiertos((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
    <>
      <nav style={{ ...styles.nav, backgroundColor: navBackground }}>
        <div style={styles.navContainer}>
          {/* Logo a la izquierda */}
          <div style={styles.logo}>
            SEPAC<span style={{ color: '#ff6b00' }}>.</span>
          </div>

          {/* Botón menú hamburguesa (exclusivo celular) */}
          <button 
            style={styles.menuToggle} 
            onClick={() => setMenuAbierto(true)}
            aria-label="Abrir menú"
          >
            ☰
          </button>

          {/* MENÚ DE ESCRITORIO (Horizontal) */}
          <ul style={styles.navLinks} className="nav-menu-desktop">
            {opcionesMenu.map((opcion, index) => {
              const tieneSubMenu = opcion.items && opcion.items.length > 0;

              return (
                <li key={index} style={styles.navItem} className={tieneSubMenu ? "dropdown-group" : "simple-group"}>
                  {tieneSubMenu ? (
                    <span style={styles.linkTitulo} className="menu-title">
                      {opcion.titulo}
                    </span>
                  ) : (
                    <a href={opcion.link || "#"} style={styles.linkTituloSimple} className="menu-title">
                      {opcion.titulo}
                    </a>
                  )}
                  
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
      </nav>

      {/* OVERLAY / FONDO OSCURO PARA MÓVIL */}
      {menuAbierto && (
        <div 
          style={styles.overlay} 
          onClick={() => setMenuAbierto(false)} 
        />
      )}

      {/* CAJÓN DESLIZABLE MÓVIL (Side Drawer Vertical) */}
      <div style={{
        ...styles.drawer,
        transform: menuAbierto ? 'translateX(0)' : 'translateX(100%)'
      }}>
        <div style={styles.drawerHeader}>
          <div style={styles.logo}>
            SEPAC<span style={{ color: '#ff6b00' }}>.</span>
          </div>
          <button 
            style={styles.closeBtn} 
            onClick={() => setMenuAbierto(false)}
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        </div>

        <ul style={styles.drawerList}>
          {opcionesMenu.map((opcion, index) => {
            const tieneSubMenu = opcion.items && opcion.items.length > 0;
            const estaAbierto = submenuesAbiertos[index];

            return (
              <li key={index} style={styles.drawerItem}>
                {tieneSubMenu ? (
                  <>
                    <div 
                      style={styles.drawerTituloConSub} 
                      onClick={() => toggleSubmenuMobile(index)}
                    >
                      <span>{opcion.titulo}</span>
                      <span style={{ color: '#ff6b00', fontSize: '0.8rem' }}>
                        {estaAbierto ? '▲' : '▼'}
                      </span>
                    </div>

                    {/* Acordeón colapsable */}
                    {estaAbierto && (
                      <ul style={styles.drawerSubList}>
                        {opcion.items.map((item, subIndex) => (
                          <li key={subIndex} style={styles.drawerSubItem}>
                            <a 
                              href="#" 
                              style={styles.drawerLink}
                              onClick={() => setMenuAbierto(false)}
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <a 
                    href={opcion.link || "#"} 
                    style={styles.drawerLink}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {opcion.titulo}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* CSS inyectado para hover de escritorio e invisibilidad de controles en mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 769px) {
          .nav-menu-desktop {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
          }

          .dropdown-group:hover .dropdown-menu {
            display: block !important;
            opacity: 1;
            visibility: visible;
          }
          
          .dropdown-group:hover .menu-title,
          .simple-group:hover .menu-title {
            color: #ff6b00 !important;
          }
          .dropdown-group:hover .menu-title::after,
          .simple-group:hover .menu-title::after {
            width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .nav-menu-desktop {
            display: none !important;
          }
          button[aria-label="Abrir menú"] {
            display: block !important;
          }
        }
      `}} />
    </>
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
    color: '#ffffff',
  },
  menuToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.8rem',
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
  
  /* ESTILOS EXCLUSIVOS DEL MODO MÓVIL (DRAWER) */
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(3px)',
    zIndex: 1001,
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '80%',
    maxWidth: '320px',
    height: '100vh',
    backgroundColor: '#1a202c',
    zIndex: 1002,
    transition: 'transform 0.3s ease-in-out',
    boxShadow: '-5px 0 15px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  drawerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  drawerList: {
    listStyle: 'none',
    padding: '20px 0 0 0',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  drawerItem: {
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    paddingBottom: '10px',
  },
  drawerTituloConSub: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '5px 0',
  },
  drawerLink: {
    color: '#e2e8f0',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '500',
    display: 'block',
    padding: '5px 0',
  },
  drawerSubList: {
    listStyle: 'none',
    paddingLeft: '15px',
    margin: '10px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderLeft: '2px solid #ff6b00',
  },
  drawerSubItem: {
    padding: '2px 0',
  },
};