import React, { useState } from 'react';

const ServiceForm = ({ service, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    platform: service?.platform || 'YouTube',
    category: service?.category || '',
    title: service?.title || '',
    description: service?.description || '',
    minQuantity: service?.minQuantity || 100,
    maxQuantity: service?.maxQuantity || 10000,
    pricePerUnit: service?.pricePerUnit || 0.01,
    discount: service?.discount || 0,
    isActive: service?.isActive ?? true,
    options: service?.options || []
  });

  const [newOption, setNewOption] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleAddOption = () => {
    if (newOption.trim()) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, { name: newOption, price: 0 }]
      }));
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleOptionPriceChange = (index, value) => {
    setFormData(prev => {
      const newOptions = [...prev.options];
      newOptions[index].price = parseFloat(value) || 0;
      return { ...prev, options: newOptions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {service ? 'Edit Service' : 'Create New Service'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="YouTube">YouTube</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="TikTok">TikTok</option>
              <option value="Telegram">Telegram</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Quantity Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Min Quantity</label>
            <input
              type="number"
              name="minQuantity"
              min="1"
              value={formData.minQuantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Quantity</label>
            <input
              type="number"
              name="maxQuantity"
              min={formData.minQuantity}
              value={formData.maxQuantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              min="0.0001"
              step="0.0001"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input
              type="number"
              name="discount"
              min="0"
              max="100"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Status */}
          <div className="flex items-center md:col-span-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
              Active Service
            </label>
          </div>
        </div>

        {/* Options Management */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Options</label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Option name"
              className="flex-1 p-2 border border-gray-300 rounded-l-md"
            />
            <button
              type="button"
              onClick={handleAddOption}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
            >
              Add Option
            </button>
          </div>

          {formData.options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="bg-gray-100 px-3 py-1 rounded-l-md flex-1">
                {option.name}
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={option.price}
                onChange={(e) => handleOptionPriceChange(index, e.target.value)}
                placeholder="Price"
                className="w-24 p-2 border border-gray-300"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-r-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {service ? 'Update Service' : 'Create Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;