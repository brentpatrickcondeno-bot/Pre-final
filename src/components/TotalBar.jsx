function TotalBar({ products }) {
  const overallTotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="total-bar">
      <span>Overall Total: </span>
      <strong>₱{overallTotal.toFixed(2)}</strong>
    </div>
  );
}

export default TotalBar;