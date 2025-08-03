// client/src/components/OrderForm.jsx
import React from 'react';

const OrderForm = ({ service, onSubmit }) => {
  const [quantity, setQuantity] = useState(service.minQuantity);
  const [link, setLink] = useState('');

  const calculateTotal = () => {
    let basePrice = quantity * service.pricePerUnit;
    if (service.discount) {
      basePrice = basePrice * (1 - service.discount / 100);
    }
    return basePrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      quantity,
      link,
      totalPrice: calculateTotal()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Link <span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity ({service.minQuantity} - {service.maxQuantity})
        </label>
        <input
          type="number"
          id="quantity"
          min={service.minQuantity}
          max={service.maxQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(service.minQuantity, Math.min(service.maxQuantity, Number(e.target.value))))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
          required
        />
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-lg font-semibold">
          Total: ${calculateTotal().toFixed(2)}
        </p>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
      >
        Place Order
      </button>
    </form>
  );
};

// Make sure you have this export statement
export default OrderForm;