import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import { defaultProducts, categories } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(defaultProducts);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddToCart = (productId, delta, remove = false) => {
    setProducts(prevProducts => {
      const product = prevProducts.find(p => p.id === productId);
      if (!product) return prevProducts;

      setCart(prevCart => {
        const cartItem = prevCart.find(item => item.id === productId);

        if (remove || (cartItem && cartItem.quantity + delta < 1)) {
          return prevCart.filter(item => item.id !== productId);
        }

        if (cartItem) {
          return prevCart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + delta } : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });

      return prevProducts;
    });
  };

  const handleAddProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity),
      rating: parseFloat(newProduct.rating)
    };
    setProducts(prev => [...prev, productWithId]);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const allCategories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  products={products}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                  onClearCart={handleClearCart}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProductDetail
                  products={products}
                  cart={cart}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/add-product"
              element={
                <AddProduct
                  onAddProduct={handleAddProduct}
                  categories={allCategories}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;