import { useState } from 'react';
import TrackingModal from '../components/TrackingModal';

export default function Orders() {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const orders = [
        { id: 'ORD-123456', date: 'Oct 24, 2024', total: 1200, status: 'Delivered', items: [{ title: 'Premium Gift Box', price: 1200, qty: 1, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=100' }] },
        { id: 'ORD-789012', date: 'Sep 15, 2024', total: 800, status: 'Delivered', items: [{ title: 'Scented Candles', price: 800, qty: 1, image: 'https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?q=80&w=100' }] }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

            {orders.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                    <a href="/shop" className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-700 transition">Start Shopping</a>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center flex-wrap gap-4">
                                <div className="flex gap-8">
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Order Placed</span>
                                        <div className="font-medium text-gray-900">{order.date}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Total</span>
                                        <div className="font-medium text-gray-900">₹{order.total}</div>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wider block">Order #</span>
                                        <div className="font-medium text-gray-900">{order.id}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <button className="text-sm text-primary hover:underline font-medium">View Invoice</button>
                                </div>
                            </div>
                            <div className="p-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex items-center space-x-4">
                                            <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                                <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                                <p className="text-lg font-bold text-primary mt-1">₹{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <span className={`h-3 w-3 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                                <span className="font-medium text-gray-900">{order.status}</span>
                                            </div>
                                            <p className="text-sm text-gray-500">Your item has been {order.status.toLowerCase()}</p>
                                            <button
                                                onClick={() => setSelectedOrderId(order.id)}
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                            >
                                                Track Package
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <TrackingModal
                isOpen={!!selectedOrderId}
                onClose={() => setSelectedOrderId(null)}
                orderId={selectedOrderId || ''}
            />
        </div>
    );
}
