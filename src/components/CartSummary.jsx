function CartSummary({ cart, onUpdateQuantity, onRemove }) {
  if (cart.length === 0) {
    return (
      <div className="cart-summary empty">
        <p>Cart is empty</p>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <span className="cart-item-name">{item.name}</span>
              <span className="cart-item-price">₱{item.price.toFixed(2)} x {item.quantity}</span>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => onUpdateQuantity(item.id, -1)} className="btn btn-qty">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, 1)} className="btn btn-qty">+</button>
              <button onClick={() => onRemove(item.id)} className="btn btn-remove">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <strong>Total: ₱{total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

export default CartSummary;