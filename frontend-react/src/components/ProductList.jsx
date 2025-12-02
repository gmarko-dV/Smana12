import React, { useState, useEffect } from 'react';
import { productoService, categoriaService } from '../services/api';
import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);
  const [filterCategoria, setFilterCategoria] = useState('');

  useEffect(() => {
    loadProductos();
    loadCategorias();
  }, []);

  const loadProductos = async () => {
    try {
      setLoading(true);
      const response = await productoService.getAll();
      setProductos(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategorias = async () => {
    try {
      const response = await categoriaService.getAll();
      setCategorias(response.data);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await productoService.delete(id);
        loadProductos();
      } catch (err) {
        setError('Error al eliminar el producto');
        console.error(err);
      }
    }
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProducto(null);
    loadProductos();
  };

  const getCategoriaNombre = (categoriaId) => {
    const categoria = categorias.find(c => c.id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  const filteredProductos = filterCategoria
    ? productos.filter(p => p.categoria && p.categoria.id === parseInt(filterCategoria))
    : productos;

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="product-list-container">
      <div className="header-actions">
        <h1>Lista de Productos</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingProducto(null);
            setShowForm(true);
          }}
        >
          Nuevo Producto
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <ProductForm
          producto={editingProducto}
          categorias={categorias}
          onClose={handleFormClose}
        />
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductos.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No hay productos registrados
                </td>
              </tr>
            ) : (
              filteredProductos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>S/ {parseFloat(producto.precio).toFixed(0)}</td>
                  <td>{producto.stock || 0}</td>
                  <td>{producto.categoria ? producto.categoria.nombre : 'Sin categoría'}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(producto)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(producto.id)}
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

export default ProductList;

