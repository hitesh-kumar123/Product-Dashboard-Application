import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { ShoppingBag, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 12;

  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(limit, skip);
        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [skip, limit]);

  const handleNextPage = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (skip - limit >= 0) {
      setSkip(skip - limit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  if (loading && products.length === 0) {
    return (
      <div className="flex-center full-height">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-state"><h2>Error</h2><p>{error}</p></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p className="text-secondary">Explore our latest collection</p>
        </div>
        <div className="stats-badge glass-panel">
          <ShoppingBag size={18} />
          <span>{total} Total Items</span>
        </div>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card glass-panel interactive"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <div className="product-image-container">
              <img src={product.thumbnail} alt={product.title} loading="lazy" />
              <div className="product-category">{product.category}</div>
            </div>
            <div className="product-info">
              <div className="product-info-header">
                <h3>{product.title}</h3>
                <div className="rating">
                  <Star size={14} className="star-icon" fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="price">${product.price.toFixed(2)}</span>
                <span className="stock-status {product.stock > 0 ? 'in-stock' : 'out-stock'}">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="pagination">
          <button 
            className="btn btn-outline btn-icon" 
            onClick={handlePrevPage} 
            disabled={skip === 0 || loading}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>
          <div className="page-indicator">
            Page <b>{currentPage}</b> of {totalPages}
          </div>
          <button 
            className="btn btn-outline btn-icon" 
            onClick={handleNextPage} 
            disabled={skip + limit >= total || loading}
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      )}
      
      {loading && products.length > 0 && (
        <div className="flex-center">
          <div className="loader-small"></div>
        </div>
      )}
    </div>
  );
};

export default Products;
