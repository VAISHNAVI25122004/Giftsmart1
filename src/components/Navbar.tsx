import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, LogOut, Menu, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
    const { user, isAdmin, logout } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center text-primary hover:text-green-700 transition">
                            <Gift className="h-8 w-8 mr-2" />
                            <span className="font-bold text-xl tracking-tight">Giftshopsmart</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary transition font-medium">Home</Link>
                        <Link to="/shop" className="text-gray-700 hover:text-primary transition font-medium">Shop</Link>
                        {user && <Link to="/orders" className="text-gray-700 hover:text-primary transition font-medium">Orders</Link>}
                        {isAdmin && <Link to="/admin" className="text-secondary font-semibold hover:text-pink-700 transition">Admin</Link>}

                        <div className="flex items-center space-x-4">
                            <Link to="/cart" className="relative text-gray-700 hover:text-primary transition">
                                <ShoppingCart className="h-6 w-6" />
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {items.length}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600 hidden lg:block">Hi, {user.displayName || 'User'}</span>
                                    <button onClick={handleLogout} className="text-gray-700 hover:text-red-600 transition" title="Logout">
                                        <LogOut className="h-6 w-6" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="flex items-center text-gray-700 hover:text-primary transition">
                                    <UserIcon className="h-6 w-6 mr-1" />
                                    <span className="font-medium">Login</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Link to="/cart" className="relative text-gray-700 hover:text-primary transition mr-4">
                            <ShoppingCart className="h-6 w-6" />
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-primary focus:outline-none"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">Home</Link>
                        <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">Shop</Link>
                        {user && <Link to="/orders" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">Orders</Link>}
                        {isAdmin && <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:bg-pink-50">Admin Dashboard</Link>}
                        {user ? (
                            <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-green-50">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
