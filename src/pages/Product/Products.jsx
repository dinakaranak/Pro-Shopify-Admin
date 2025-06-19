import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSave, FiArrowLeft } from 'react-icons/fi';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: ''
  });

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Books',
    'Beauty',
    'Sports',
    'Other'
  ];

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
          setProduct({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            imageUrl: data.imageUrl,
            stock: data.stock
          });
        } catch (error) {
          console.error('Error fetching product:', error);
          toast.error('Failed to load product');
          navigate('/products');
        }
      };
      fetchProduct();
    }
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!product.name.trim()) newErrors.name = 'Product name is required';
    if (!product.description.trim()) newErrors.description = 'Description is required';
    if (!product.price || product.price <= 0) newErrors.price = 'Valid price is required';
    if (!product.category) newErrors.category = 'Category is required';
    if (!product.stock || product.stock < 0) newErrors.stock = 'Valid stock quantity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (id) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${id}`, product);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await axios.post('http://localhost:5000/api/products', product);
        toast.success('Product added successfully!');
      }
      setTimeout(() => navigate('/products'), 1500);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">{id ? 'Edit Product' : 'Add New Product'}</h2>
                <button 
                  onClick={() => navigate('/products')}
                  className="btn btn-sm btn-light"
                >
                  <FiArrowLeft className="me-1" /> Back
                </button>
              </div>
            </div>
            
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Product Name *</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    name="name" 
                    value={product.name} 
                    onChange={handleChange}
                    placeholder="Enter product name"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Description *</label>
                  <textarea 
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name="description" 
                    value={product.description} 
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter product description"
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input 
                        type="number" 
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        name="price" 
                        value={product.price} 
                        onChange={handleChange}
                        min="0.01"
                        step="0.01"
                        placeholder="0.00"
                      />
                      {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock Quantity *</label>
                    <input 
                      type="number" 
                      className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                      name="stock" 
                      value={product.stock} 
                      onChange={handleChange}
                      min="0"
                      placeholder="Available quantity"
                    />
                    {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Category *</label>
                  <select
                    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                    name="category" 
                    value={product.category} 
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                
                <div className="mb-4">
                  <label className="form-label">Image URL</label>
                  <input 
                    type="url" 
                    className="form-control"
                    name="imageUrl" 
                    value={product.imageUrl} 
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <div className="form-text">Optional product image URL</div>
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => navigate('/products')}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {id ? 'Updating...' : 'Adding...'}
                      </>
                    ) : (
                      <>
                        <FiSave className="me-2" />
                        {id ? 'Update Product' : 'Add Product'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;