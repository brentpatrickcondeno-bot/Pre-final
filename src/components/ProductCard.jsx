import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart, cart, isInCart }) {
  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity < 5;

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      <div className="card-image">
        <img src={product.image} alt={product.name} />
        {isLowStock && <span className="low-stock-badge">Low Stock</span>}
      </div>
      <div className="card-content">
        <Link to={`/products/${product.id}`} className="product-link">
          <h3>{product.name}</h3>
        </Link>
        <p className="category">{product.category}</p>
        <p className="price">₱{product.price.toFixed(2)}</p>
        <p className="quantity">Qty: {product.quantity}</p>
        <p className="subtotal">Subtotal: ₱{subtotal.toFixed(2)}</p>
        <div className="card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-view">View Details</Link>
          {isInCart ? (
            <div className="quantity-controls">
              <button onClick={() => onAddToCart(product.id, -1)} className="btn btn-qty">-</button>
              <span className="cart-qty">{cart.find(item => item.id === product.id)?.quantity || 0}</span>
              <button onClick={() => onAddToCart(product.id, 1)} className="btn btn-qty">+</button>
              <button onClick={() => onAddToCart(product.id, 0, true)} className="btn btn-remove">Remove</button>
            </div>
          ) : (
            <button onClick={() => onAddToCart(product.id, 1)} className="btn btn-add">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;