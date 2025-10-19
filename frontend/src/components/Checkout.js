import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentAPI, authAPI, formatPrice } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockClosedIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Button } from './ui/button.tsx';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './ui/card.jsx';
import { Label } from './ui/label.tsx';
import { Input } from './ui/input.jsx';

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key'
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { items, total, clearCart } = useCart();
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderReference, setOrderReference] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  const [useSameAddress, setUseSameAddress] = useState(true);

  useEffect(() => {
    if (isGuestCheckout && isAuthenticated) {
      navigate('/profile?tab=orders');
    }
  }, [isGuestCheckout, isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setShippingInfo((prev) => ({
        ...prev,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
      }));
    }
  }, [isAuthenticated, user]);

  const shippingCost = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shippingCost + tax;

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setPaymentError('');
        setPaymentStatus('');
        setOrderReference('');

        if (finalTotal <= 0) {
          setPaymentError('Invalid total amount');
          return;
        }

        const response = await paymentAPI.createPaymentIntent(finalTotal);
        console.log('Payment intent response:', response);

        if (!response?.data?.client_secret) {
          throw new Error('Unable to initialize payment. Please try again.');
        }

        setClientSecret(response.data.client_secret);
        setPaymentStatus('ready');
      } catch (err) {
        const errorMessage =
          typeof err === 'string' ? err : err?.message || 'Failed to initialize payment';
        console.error('Payment intent creation failed:', err);
        setPaymentError(errorMessage);
        setPaymentStatus('failed');
        toast.error(errorMessage);
      }
    };

    if (items.length > 0) {
      createPaymentIntent();
    }
  }, [finalTotal, items]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear any existing errors when user makes changes
    setPaymentError('');
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    const missing = required.filter((field) => !shippingInfo[field]?.trim());

    if (missing.length > 0) {
      const errorMessage = `Please fill in all required fields: ${missing.join(', ')}`;
      setPaymentError(errorMessage);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError('Payment system is not ready. Please try again.');
      return;
    }

    if (!validateShippingInfo()) {
      return;
    }

    setIsProcessing(true);
    setPaymentError('');
    setOrderReference('');

    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        throw new Error('Payment form is not ready');
      }

      // First attempt the Stripe payment
      const billingDetails = {
        name: useSameAddress
          ? `${shippingInfo.firstName} ${shippingInfo.lastName}`
          : `${billingInfo.firstName} ${billingInfo.lastName}`,
        email: useSameAddress ? shippingInfo.email : billingInfo.email,
        address: {
          line1: useSameAddress ? shippingInfo.address : billingInfo.address,
          city: useSameAddress ? shippingInfo.city : billingInfo.city,
          state: useSameAddress ? shippingInfo.state : billingInfo.state,
          postal_code: useSameAddress ? shippingInfo.zipCode : billingInfo.zipCode,
          country: useSameAddress ? shippingInfo.country : billingInfo.country,
        },
      };

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: billingDetails,
        },
      });

      if (stripeError) {
        console.error('Stripe payment error:', stripeError);
        throw new Error(stripeError.message || 'Payment processing failed');
      }

      if (!paymentIntent?.id) {
        throw new Error('Invalid payment response received');
      }

      // Then confirm the order with our backend
      try {
        console.log('Confirming order with backend...');
        const confirmResponse = await paymentAPI.confirmPayment(paymentIntent.id, shippingInfo);
        console.log('Order confirmation response:', confirmResponse);

        if (!isAuthenticated) {
          try {
            const guestPassword = Math.random().toString(36).slice(-8);
            const guestData = {
              first_name: shippingInfo.firstName,
              last_name: shippingInfo.lastName,
              email: shippingInfo.email,
              password: guestPassword,
            };
            await authAPI.register(guestData);
            await login({ email: shippingInfo.email, password: guestPassword });

            setPaymentStatus('success');
            toast.success('Order placed successfully! An account has been created for you.');
            clearCart();
            setIsGuestCheckout(true); // This will trigger the useEffect to navigate
          } catch (err) {
            console.error('Guest registration failed:', err);
            setPaymentStatus('success'); // Payment was successful
            const orderId = confirmResponse.data?.order_id;
            let message = `Your order was placed successfully, but we couldn't create an account. Reason: ${err.message}.`;
            if (orderId) {
              message += ` Please save your order ID: ${orderId}.`;
            }
            toast.error(message, { duration: 10000 });
            clearCart();
            navigate('/'); // Navigate to home page after partial success
          }
        } else {
          // For authenticated users
          setPaymentStatus('success');
          toast.success('Order placed successfully!');
          clearCart();
          navigate('/profile?tab=orders');
        }
      } catch (confirmError) {
        console.error('Order confirmation failed:', confirmError);

        // Extract error reference if present
        const refMatch = confirmError.message?.match(/reference: ([^.]+)/);
        if (refMatch) {
          setOrderReference(refMatch[1]);
        }

        // Handle specific error cases
        if (confirmError.message?.includes('out of stock')) {
          throw new Error(
            'Some items in your cart are out of stock. Please review your cart and try again.'
          );
        } else if (confirmError.message?.includes('reference:')) {
          throw new Error(
            'Your payment was processed but we encountered an issue completing your order. ' +
              'Please contact support with reference: ' +
              refMatch?.[1]
          );
        } else {
          throw new Error('Payment succeeded but order creation failed. Please contact support.');
        }
      }
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : err?.message || 'Payment failed';
      console.error('Payment/Order error:', err);
      setPaymentError(errorMessage);
      setPaymentStatus('failed');
      toast.error(errorMessage);
    } finally {
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
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <select
                    id="country"
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
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSameAddress}
                    onChange={() => setUseSameAddress(!useSameAddress)}
                    className="mr-2"
                  />
                  <span>Billing address is the same as shipping</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {!useSameAddress && (
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="billingFirstName">First Name</Label>
                    <Input
                      id="billingFirstName"
                      name="firstName"
                      value={billingInfo.firstName}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, firstName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingLastName">Last Name</Label>
                    <Input
                      id="billingLastName"
                      name="lastName"
                      value={billingInfo.lastName}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, lastName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="billingEmail">Email</Label>
                    <Input
                      id="billingEmail"
                      name="email"
                      type="email"
                      value={billingInfo.email}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input
                      id="billingAddress"
                      name="address"
                      value={billingInfo.address}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, address: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingCity">City</Label>
                    <Input
                      id="billingCity"
                      name="city"
                      value={billingInfo.city}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, city: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingState">State</Label>
                    <Input
                      id="billingState"
                      name="state"
                      value={billingInfo.state}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, state: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingZipCode">ZIP Code</Label>
                    <Input
                      id="billingZipCode"
                      name="zipCode"
                      value={billingInfo.zipCode}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, zipCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billingCountry">Country</Label>
                    <select
                      id="billingCountry"
                      name="country"
                      value={billingInfo.country}
                      onChange={(e) =>
                        setBillingInfo({ ...billingInfo, country: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCardIcon className="h-6 w-6 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label>Card Details</Label>
                  <div
                    className={`border rounded-md p-3 ${
                      paymentError ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
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
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                      onChange={() => {
                        if (paymentError) {
                          setPaymentError('');
                        }
                      }}
                    />
                  </div>
                </div>

                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{paymentError}</p>
                    {orderReference && (
                      <p className="mt-1 text-sm text-gray-600">
                        Reference: <span className="font-mono">{orderReference}</span>
                      </p>
                    )}
                  </div>
                )}

                {paymentStatus === 'failed' && !paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">
                      Payment failed. Please check your card details and try again.
                    </p>
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <LockClosedIcon className="h-4 w-4 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <Button
                  type="submit"
                  disabled={!stripe || isProcessing || !clientSecret || items.length === 0}
                  className="w-full"
                >
                  {isProcessing
                    ? 'Processing...'
                    : !clientSecret
                    ? 'Loading...'
                    : items.length === 0
                    ? 'Cart is empty'
                    : `Pay ${formatPrice(finalTotal)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
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
                      <p className="font-medium text-gray-900 text-sm">{item.product?.name}</p>
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
            </CardContent>
            <CardFooter>
              <div className="space-y-2 w-full">
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Error boundary for checkout component
class CheckoutErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message || 'Something went wrong with the checkout process.',
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Checkout error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
              <p className="text-gray-700 mb-4">{this.state.errorMessage}</p>
              <Button
                onClick={() => {
                  this.setState({ hasError: false, errorMessage: '' });
                  window.location.reload();
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <div className="container-max px-4 sm:px-6 lg:px-8">
            <CheckoutForm />
          </div>
        </div>
      </CheckoutErrorBoundary>
    </Elements>
  );
};

export default Checkout;
