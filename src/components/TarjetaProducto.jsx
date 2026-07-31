// src/components/TarjetaProducto.jsx
import React from 'react';

export default function TarjetaProducto({ nombre, variedad, temporada, mercados, imagen }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontFamily: 'sans-serif'
    }}>
      {imagen && (
        <img 
          src={imagen} 
          alt={nombre} 
          style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }} 
        />
      )}
      <h3 style={{ color: '#1b4332', margin: '0 0 8px 0', fontSize: '1.4rem' }}>{nombre}</h3>
      <p style={{ margin: '0 0 6px 0', color: '#4a5568' }}><strong>Variedad:</strong> {variedad}</p>
      <p style={{ margin: '0 0 6px 0', color: '#4a5568' }}><strong>Temporada:</strong> {temporada}</p>
      
      <div style={{ marginTop: '12px' }}>
        <strong style={{ display: 'block', marginBottom: '4px', color: '#2d6a4f', fontSize: '0.9rem' }}>
          Mercados de Destino:
        </strong>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {mercados.map((mercado, index) => (
            <span key={index} style={{
              background: '#e8f5e9',
              color: '#1b4332',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              {mercado}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}