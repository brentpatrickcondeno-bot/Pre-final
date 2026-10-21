import ProductForm from '../components/ProductForm';

function AddProduct({ onAddProduct, categories }) {
  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <ProductForm onSubmit={onAddProduct} categories={categories} />
    </div>
  );
}

export default AddProduct;