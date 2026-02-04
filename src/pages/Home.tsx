import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { useProducts } from '../context/ProductContext';

export default function Home() {
    const { products } = useProducts();
    // Get newest products for featured section (assuming newest are added to start of list)
    const featuredProducts = products.slice(0, 4);
    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-gradient-to-r from-green-50 to-pink-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col md:flex-row items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 space-y-6 z-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                            Gifts That <span className="text-primary">Spark Joy</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-lg">
                            Find the perfect present for every occasion. Curated, wrapped, and delivered with love.
                        </p>
                        <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 absolute right-0 top-0 h-full w-full md:relative md:h-auto"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
                            alt="Gifts"
                            className="object-cover w-full h-full md:rounded-3xl shadow-2xl opacity-50 md:opacity-100"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Categories / Highlights */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Occasion</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Birthdays', 'Anniversaries', 'Corporate', 'Festive'].map((cat, idx) => (
                        <Link to={`/shop?category=${cat.toLowerCase()}`} key={idx} className="group relative rounded-xl overflow-hidden aspect-square shadow-md hover:shadow-xl transition">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                            <img
                                src={[
                                    'https://images.unsplash.com/photo-1592903297149-37fb25202dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJpcnRoZGF5JTIwZ2lmdHxlbnwwfHwwfHx8MA%3D%3D', // Birthdays
                                    'https://plus.unsplash.com/premium_photo-1711226109521-641b2f4538d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW5uaXZlcnNhcnklMjBnaWZ0fGVufDB8fDB8fHww', // Anniversaries (User updated)
                                    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400', // Corporate (Office/Gifts)
                                    'https://images.unsplash.com/photo-1512909481869-0eaa1e9817ba?auto=format&fit=crop&w=400'  // Festive
                                ][idx]}
                                alt={cat}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <span className="absolute bottom-4 left-4 text-white font-bold text-xl z-20">{cat}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
                    <Link to="/shop" className="text-primary hover:underline font-semibold flex items-center">View All <ArrowRight className="h-4 w-4 ml-1" /></Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100 flex flex-col group">
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.title}</h3>
                                <div className="flex items-center mb-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-500 ml-1">4.8</span>
                                </div>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                                    <span className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition">View</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
