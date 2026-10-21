import { Link, useParams } from 'react-router-dom';

function ProductDetail({ products, cart, onAddToCart }) {
  const { id } = useParams();
  const productId = parseInt(id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="product-detail not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-back">Back to Products</Link>
      </div>
    );
  }

  const isInCart = cart.some(item => item.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);
  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity < 5;

  return (
    <div className="product-detail">
      <Link to="/" className="btn btn-back">← Back to Products</Link>

      <div className="detail-content">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
          {isLowStock && <span className="low-stock-badge">Low Stock</span>}
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">{product.category}</p>

          <div className="detail-rating">
            <span>Rating: </span>
            <strong>{product.rating}/5</strong>
          </div>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-specification">
            <h3>Specification</h3>
            <p>{product.specification}</p>
          </div>

          <div className="detail-pricing">
            <p className="detail-price">Price: ₱{product.price.toFixed(2)}</p>
            <p className="detail-quantity">Available Quantity: {product.quantity}</p>
            <p className="detail-subtotal">Subtotal: ₱{subtotal.toFixed(2)}</p>
          </div>

          <div className="detail-actions">
            {isInCart ? (
              <div className="quantity-controls">
                <button onClick={() => onAddToCart(product.id, -1)} className="btn btn-qty">-</button>
                <span className="cart-qty">{cartItem.quantity}</span>
                <button onClick={() => onAddToCart(product.id, 1)} className="btn btn-qty">+</button>
                <button onClick={() => onAddToCart(product.id, 0, true)} className="btn btn-remove">Remove from Cart</button>
              </div>
            ) : (
              <button onClick={() => onAddToCart(product.id, 1)} className="btn btn-add">Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;