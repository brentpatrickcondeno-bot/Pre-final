import { useState } from 'react';

function ProductForm({ onSubmit, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    specification: '',
    rating: '',
    price: '',
    quantity: '',
    image: '',
    imageFile: null
  });
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.specification.trim()) newErrors.specification = 'Specification is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.quantity) newErrors.quantity = 'Quantity is required';
    else if (parseInt(formData.quantity) <= 0) newErrors.quantity = 'Quantity must be greater than 0';
    if (!formData.image && !formData.imageFile) newErrors.image = 'Feature image is required (URL or file)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file, image: '' }));
      setImageError('');
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, image: value, imageFile: null }));
    if (value) {
      setPreview(value);
      setImageError('');
    } else {
      setPreview('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const imageUrl = formData.imageFile ? URL.createObjectURL(formData.imageFile) : formData.image;
      onSubmit({ ...formData, image: imageUrl });
      setFormData({
        name: '', category: '', description: '', specification: '',
        rating: '', price: '', quantity: '', image: '', imageFile: null
      });
      setPreview('');
    }
  };

  const generateId = () => Date.now();

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add New Product</h2>

      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={errors.category ? 'error' : ''}
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error-message">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="specification">Specification *</label>
        <textarea
          id="specification"
          name="specification"
          value={formData.specification}
          onChange={handleChange}
          rows={3}
          className={errors.specification ? 'error' : ''}
        />
        {errors.specification && <span className="error-message">{errors.specification}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5) *</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            className={errors.rating ? 'error' : ''}
          />
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₱) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity *</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            className={errors.quantity ? 'error' : ''}
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>
      </div>

      <div className="form-group">
        <label>Feature Image *</label>
        <div className="image-inputs">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleFileChange}
              className={imageError ? 'error' : ''}
            />
            <label htmlFor="imageFile" className="btn btn-file">Choose File</label>
          </div>
          <span className="or-divider">or</span>
          <input
            type="url"
            id="imageUrl"
            name="image"
            placeholder="Paste image URL"
            value={formData.image}
            onChange={handleImageUrlChange}
            className={errors.image && !formData.imageFile ? 'error' : ''}
          />
        </div>
        {imageError && <span className="error-message">{imageError}</span>}
        {errors.image && !formData.imageFile && <span className="error-message">{errors.image}</span>}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <span>Preview</span>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-submit">Add Product</button>
    </form>
  );
}

export default ProductForm;