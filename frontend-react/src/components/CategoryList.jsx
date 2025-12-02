import React, { useState, useEffect } from 'react';
import { categoriaService } from '../services/api';
import CategoryForm from './CategoryForm';
import './CategoryList.css';

const CategoryList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState(null);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriaService.getAll();
      setCategorias(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las categorías');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      try {
        await categoriaService.delete(id);
        loadCategorias();
      } catch (err) {
        setError('Error al eliminar la categoría');
        console.error(err);
      }
    }
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategoria(null);
    loadCategorias();
  };

  if (loading) {
    return <div className="loading">Cargando categorías...</div>;
  }

  return (
    <div className="category-list-container">
      <div className="header-actions">
        <h1>Gestión de Categorías</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingCategoria(null);
            setShowForm(true);
          }}
        >
          Nueva Categoría
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <CategoryForm
          categoria={editingCategoria}
          onClose={handleFormClose}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No hay categorías registradas
                </td>
              </tr>
            ) : (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td>{categoria.descripcion || '-'}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(categoria)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(categoria.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;

