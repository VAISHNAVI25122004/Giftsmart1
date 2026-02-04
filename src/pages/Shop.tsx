import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star } from 'lucide-react';

export default function Shop() {
    const { products, loading } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category') || '';
    const [sortOption, setSortOption] = useState('newest');

    // Filter and Sort Logic
    let displayedProducts = [...products];

    // Apply Category Filter
    if (categoryFilter) {
        const term = categoryFilter.toLowerCase();
        displayedProducts = displayedProducts.filter(p =>
            p.category_id === categoryFilter ||
            p.title.toLowerCase().includes(term) ||
            p.description?.toLowerCase().includes(term)
        );
    }

    // Apply Sorting
    if (sortOption === 'price-low') {
        displayedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        displayedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
        // Assuming higher ID means newer for mock data, or we could add a date field later
        displayedProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val) setSearchParams({ category: val });
        else setSearchParams({});
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none bg-white font-medium text-gray-700"
                        >
                            <option value="">All Categories</option>
                            <option value="birthdays">Birthdays</option>
                            <option value="anniversaries">Anniversaries</option>
                            <option value="corporate">Corporate</option>
                            <option value="festive">Festive</option>
                        </select>
                    </div>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium text-gray-700"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-xl"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {displayedProducts.map((product) => (
                        <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 overflow-hidden flex flex-col">
                            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                {product.discount_price && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        Sale
                                    </span>
                                )}
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
                                <div className="flex items-center mb-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                                </div>
                                <div className="mt-auto flex justify-between items-baseline">
                                    <div className="flex items-baseline space-x-2">
                                        <span className="text-xl font-bold text-primary">₹{product.price}</span>
                                        {product.discount_price && <span className="text-sm text-gray-400 line-through">₹{product.discount_price}</span>}
                                    </div>
                                    <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition">
                                        +
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
