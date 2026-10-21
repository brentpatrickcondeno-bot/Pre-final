import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Product Manager</h1>
        <nav className="nav">
          <Link to="/">Products</Link>
          <Link to="/add-product">Add Product</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;