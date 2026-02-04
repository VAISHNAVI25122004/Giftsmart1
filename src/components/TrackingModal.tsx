
import { X, Truck, Package, MapPin } from 'lucide-react';

interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

export default function TrackingModal({ isOpen, onClose, orderId }: TrackingModalProps) {
    if (!isOpen) return null;

    const steps = [
        { title: 'Order Placed', date: 'Oct 24, 10:30 AM', icon: Package, completed: true },
        { title: 'Processing', date: 'Oct 25, 02:15 PM', icon: Package, completed: true },
        { title: 'Shipped', date: 'Oct 26, 09:00 AM', icon: Truck, completed: true },
        { title: 'Out for Delivery', date: 'Oct 27, 08:30 AM', icon: Truck, completed: false, current: true },
        { title: 'Delivered', date: 'Expected Oct 27', icon: MapPin, completed: false }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Track Order</h3>
                        <p className="text-sm text-gray-500">Order #{orderId}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="relative">
                        {/* Vertical line connecting steps */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" style={{ height: 'calc(100% - 40px)' }}></div>

                        <div className="space-y-8 relative">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-start">
                                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${step.completed || step.current ? 'border-primary bg-primary text-white' : 'border-gray-200 bg-white text-gray-400'} transition-colors duration-300`}>
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div className="ml-4 pt-3">
                                        <h4 className={`text-lg font-bold ${step.completed || step.current ? 'text-gray-900' : 'text-gray-400'}`}>
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">{step.date}</p>
                                        {step.current && (
                                            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full animate-pulse">
                                                On the way
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
