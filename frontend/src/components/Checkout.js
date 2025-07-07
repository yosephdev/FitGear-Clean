import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentAPI, formatPrice } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  CreditCardIcon,
  LockClosedIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  const shippingCost = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  useEffect(() => {
    createPaymentIntent();
  }, [total]);

  const createPaymentIntent = async () => {
    try {
      const response = await paymentAPI.createPaymentIntent(finalTotal);
      setClientSecret(response.data.client_secret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      toast.error('Failed to initialize payment');
    }
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          address: {
            line1: shippingInfo.address,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.zipCode,
            country: shippingInfo.country,
          },
        },
      },
    });

    if (error) {
      console.error('Payment failed:', error);
      toast.error(error.message);
      setIsProcessing(false);
    } else {
      try {
        await paymentAPI.confirmPayment(paymentIntent.id);
        toast.success('Order placed successfully!');
        clearCart();
        navigate('/profile?tab=orders');
      } catch (error) {
        console.error('Error confirming payment:', error);
        toast.error('Payment succeeded but order creation failed. Please contact support.');
      }
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCardIcon className="h-6 w-6 mr-2" />
              Payment Information
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Details
                </label>
                <div className="border border-gray-300 rounded-md p-3">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <LockClosedIcon className="h-4 w-4 mr-2" />
                <span>Your payment information is secure and encrypted</span>
              </div>

              <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.product_id} className="flex items-center space-x-3">
                  <img
                    src={item.product?.images?.[0] || 'https://via.placeholder.com/60x60'}
                    alt={item.product?.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">
                      {item.product?.name}
                    </p>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                <span>30-Day Money Back Guarantee</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircleIcon className="h-4 w-4 mr-2 text-green-500" />
                <span>Free Shipping on Orders Over $100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;