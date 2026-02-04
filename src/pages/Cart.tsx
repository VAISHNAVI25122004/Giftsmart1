import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { items, removeFromCart, total } = useCart();

    const handleCheckout = () => {
        // In a real app, integrate Razorpay here
        alert('Proceeding to Razorpay Checkout...');
        // navigate('/orders');
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="inline-flex h-24 w-24 bg-green-50 rounded-full items-center justify-center mb-6">
                    <ShoppingBag className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products to find something you love.</p>
                <Link to="/shop" className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-green-700 transition">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="lg:w-2/3 space-y-6">
                    {items.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
                                <div className="text-sm text-gray-500 mb-1">{item.selectedVariant}</div>
                                <div className="text-primary font-bold">₹{item.price} x {item.quantity}</div>
                            </div>
                            <div className="text-xl font-bold text-gray-900">₹{item.price * item.quantity}</div>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition">
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-xl text-gray-900">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                        </div>
                        <button onClick={handleCheckout} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-green-700 transition flex justify-center items-center shadow-lg">
                            Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
