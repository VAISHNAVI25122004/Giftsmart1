import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-4">Giftshopsmart</h3>
                        <p className="text-gray-600 text-sm">
                            Your one-stop destination for unique and thoughtful gifts. Spreading joy, one package at a time.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/shop" className="hover:text-primary">Shop Now</Link></li>
                            <li><Link to="/orders" className="hover:text-primary">Track Order</Link></li>
                            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
                            <li><Link to="/refund-policy" className="hover:text-primary">Refund Policy</Link></li>
                            <li><Link to="/shipping-policy" className="hover:text-primary">Shipping Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>support@giftshopsmart.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Giftshopsmart. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
