import React, { useState, useEffect } from 'react';
import Api from '../Services/Api';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    imageUrl: '',
    buttonText: 'SHOP NOW',
    isActive: true,
    link: '#'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await Api.get('/banners');
      setBanners(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch banners');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.subtitle || !formData.imageUrl) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // POST request to save banner to database
      const response = await Api.post('/banners', formData);
      
      // Update local state with new banner
      setBanners([...banners, response.data]);
      
      // Reset form
      setFormData({
        
        title: '',
        subtitle: '',
        imageUrl: '',
        buttonText: 'SHOP NOW',
        isActive: true,
        link: '#'
      });
      
      alert('Banner added successfully!');
    } catch (err) {
      setError('Failed to add banner');
      console.error('POST error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Banner Management</h1>
      
      {/* Add Banner Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Banner</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            {/* Subtitle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle *
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            
            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
                placeholder="https://example.com/banner-image.jpg"
              />
            </div>
            
            {/* Button Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            {/* Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                placeholder="https://example.com/shop"
              />
            </div>
            
            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                Active Banner
              </label>
            </div>

            <div>
                <button
                 type='submit'
                 onChange={handleSubmit}>Submit</button>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Adding...' : 'Add Banner'}
          </button>
        </form>
      </div>
      
      {/* Banners List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Existing Banners</h2>
        
        {loading && banners.length === 0 ? (
          <p>Loading banners...</p>
        ) : banners.length === 0 ? (
          <p>No banners found</p>
        ) : (
          <div className="space-y-4">
            {banners.map((banner) => (
              <div key={banner._id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <img 
                    src={banner.imageUrl} 
                    alt={banner.title}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-lg font-bold">{banner.title}</h3>
                  <p className="text-gray-600">{banner.subtitle}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className={`px-2 py-1 text-xs rounded ${
                      banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {banner.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-blue-600">{banner.buttonText}</span>
                    <a href={banner.link} className="text-sm text-gray-500 hover:underline">
                      {banner.link}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner; 