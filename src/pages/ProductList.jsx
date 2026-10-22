import { Link } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import TotalBar from '../components/TotalBar';
import CartSummary from '../components/CartSummary';

function ProductList({ products, selectedCategory, onCategoryChange, cart, onAddToCart, onClearCart }) {
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="product-list-page">
      <div className="page-header">
        <h2>Products</h2>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </div>

      <div className="main-layout">
        <div className="products-section">
          <TotalBar products={products} />
          <div className="products-grid">
            {filteredProducts.length === 0 ? (
              <p className="no-products">No products found in this category.</p>
            ) : (
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  cart={cart}
                  isInCart={cart.some(item => item.id === product.id)}
                />
              ))
            )}
          </div>
        </div>

        <aside className="cart-sidebar">
          <CartSummary
            cart={cart}
            onUpdateQuantity={onAddToCart}
            onRemove={onAddToCart}
            onClearCart={onClearCart}
          />
        </aside>
      </div>
    </div>
  );
}

export default ProductList;