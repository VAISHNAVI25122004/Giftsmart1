import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/products';

// Mock Data (In real app, fetch by ID from Supabase)
const DEFAULT_PRODUCT: Product = MOCK_PRODUCTS[0];

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product>(DEFAULT_PRODUCT);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState('Red');
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeImage, setActiveImage] = useState(0);

    // Reset/Init selection when product data loads/changes
    useEffect(() => {
        if (product.variants && product.variants.options.length > 0) {
            setSelectedColor(product.variants.options[0]);
        } else {
            setSelectedColor('Red');
        }
    }, [product]);

    useEffect(() => {
        // Reset image on id change
        setActiveImage(0);

        async function fetchProduct() {
            if (!id) return;

            // Try fetching from Supabase
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (!error && data) {
                setProduct(data);
            } else {
                // Fallback to mock if not found (e.g. for testing old links)
                const found = MOCK_PRODUCTS.find(p => p.id === id);
                if (found) setProduct(found);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const variantInfo = product.variants
            ? `${product.variants.type}: ${selectedColor} - `
            : '';
        addToCart(product, quantity, `${variantInfo}${selectedSize}`);
        alert('Added to cart!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                        <img src={product.images[activeImage]} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(idx)}
                                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${activeImage === idx ? 'border-primary' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="text-gray-500">(120 Reviews)</span>
                    </div>

                    <div className="text-3xl font-bold text-primary">₹{product.price}</div>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {product.description}
                    </p>

                    <div className="border-t border-b border-gray-100 py-6 space-y-6">
                        {/* Variants */}
                        {product.variants && (
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3">{product.variants.type}</h3>
                                <div className="flex space-x-3">
                                    {product.variants.options.map((variant, idx) => (
                                        <button
                                            key={variant}
                                            onClick={() => {
                                                setSelectedColor(variant);
                                                // Switch image if available for this index
                                                if (idx < product.images.length) {
                                                    setActiveImage(idx);
                                                }
                                            }}
                                            className={`px-4 py-2 rounded-full border ${selectedColor === variant ? 'border-primary bg-green-50 text-primary' : 'border-gray-200 text-gray-600'}`}
                                        >
                                            {variant}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                            <div className="flex space-x-3">
                                {['S', 'M', 'L'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full border flex items-center justify-center ${selectedSize === size ? 'border-primary bg-green-50 text-primary' : 'border-gray-200 text-gray-600'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50"><Minus className="h-4 w-4" /></button>
                            <span className="w-12 text-center font-medium">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-50"><Plus className="h-4 w-4" /></button>
                        </div>
                        <button onClick={handleAddToCart} className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold text-lg hover:bg-green-700 transition flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-4">
                        <div className="flex items-center"><Truck className="h-5 w-5 mr-2 text-primary" /> Free Delivery</div>
                        <div className="flex items-center"><ShieldCheck className="h-5 w-5 mr-2 text-primary" /> 1 Year Warranty</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
