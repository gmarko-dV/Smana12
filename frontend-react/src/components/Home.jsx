import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Bienvenido al Sistema de Gestión</h1>
        <p>Administra tus productos y categorías de manera sencilla y rápida.</p>
      </div>
      
      <div className="home-actions">
        <Link to="/productos" className="action-btn btn-productos">
          <span className="icon">📦</span>
          <span className="text">Gestionar Productos</span>
        </Link>
        
        <Link to="/categorias" className="action-btn btn-categorias">
          <span className="icon">🌿</span>
          <span className="text">Gestionar Categorías</span>
        </Link>
      </div>
      
      <div className="home-footer">
        <p>© 2025 Gestión CRUD Productos y Categorías</p>
      </div>
    </div>
  );
};

export default Home;

