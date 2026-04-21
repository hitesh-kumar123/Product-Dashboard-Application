import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { ArrowLeft, Star, Tag, Box, Truck } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-center full-height">
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-state">
        <h2>Oops!</h2>
        <p>{error || 'Product not found'}</p>
        <button className="btn btn-primary mt-4" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  // Calculate discounted price
  const discountAmount = product.price * (product.discountPercentage / 100);
  const originalPrice = product.price / (1 - (product.discountPercentage / 100)); // rough estimate if price is already discounted, but standard DummyJSON returns current price in "price" and original logically would be more. Wait, "price" in dummyjson is usually the discounted or base price. Assuming price is base and discount is applied on it...actually DummyJSON price is the actual price. Let's just use it directly and show discount percentage.

  return (
    <div className="page-container">
      <button className="btn btn-ghost mb-6" onClick={() => navigate('/products')}>
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>

      <div className="product-detail-layout glass-panel">
        <div className="product-media">
          <div className="main-image">
            <img 
              src={product.images && product.images.length > 0 ? product.images[activeImage] : product.thumbnail} 
              alt={product.title} 
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-detailed">
          <div className="brand-badge">{product.brand || product.category}</div>
          <h1 className="product-title">{product.title}</h1>
          
          <div className="product-meta">
            <div className="rating-badge">
              <Star size={16} fill="currentColor" />
              <span>{product.rating}</span>
            </div>
            <span className="dot-separator">•</span>
            <span className="reviews-count">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="pricing-section">
            <div className="current-price">${product.price.toFixed(2)}</div>
            {product.discountPercentage > 0 && (
              <div className="discount-tag">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>

          <div className="divider"></div>

          <p className="product-description-long">{product.description}</p>

          <div className="product-specs">
            <div className="spec-item">
              <div className="spec-icon"><Tag size={20} /></div>
              <div className="spec-details">
                <span className="spec-label">Category</span>
                <span className="spec-value">{product.category}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><Box size={20} /></div>
              <div className="spec-details">
                <span className="spec-label">Availability</span>
                <span className={`spec-value ${product.availabilityStatus === 'In Stock' || product.stock > 0 ? 'text-success' : 'text-error'}`}>
                  {product.availabilityStatus || (product.stock > 0 ? `${product.stock} in stock` : 'Out of stock')}
                </span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon"><Truck size={20} /></div>
              <div className="spec-details">
                <span className="spec-label">Shipping info</span>
                <span className="spec-value">{product.shippingInformation || 'Standard Shipping'}</span>
              </div>
            </div>
          </div>

          {/* Additional details could be rendered here like reviews */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
