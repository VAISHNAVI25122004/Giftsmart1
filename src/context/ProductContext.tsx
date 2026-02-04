
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/products';
import { supabase } from '../lib/supabase';

interface ProductContextType {
    products: Product[];
    loading: boolean;
    addProduct: (product: Omit<Product, 'id' | 'rating'>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        try {
            // Try to fetch from Supabase first
            // TEMPORARILY DISABLED TO FORCE LOCAL MOCK DATA UPDATES
            /* 
            if (supabase) {
                const { data, error } = await supabase.from('products').select('*');
                if (!error && data && data.length > 0) {
                    setProducts(data);
                    setLoading(false);
                    return;
                }
            } 
            */
        } catch (e) {
            console.warn("Supabase load failed, falling back to mock data");
        }

        // Fallback to mock data if DB is empty or fails
        setProducts(MOCK_PRODUCTS);
        setLoading(false);
    }

    const addProduct = async (newProductData: Omit<Product, 'id' | 'rating'>) => {
        const newProduct: Product = {
            ...newProductData,
            id: (products.length + 1).toString(), // Simple ID generation for mock
            rating: 0 // Default rating for new products
        };

        // Update local state immediately (Optimistic update for Mock Mode)
        setProducts(prev => [newProduct, ...prev]);

        // Attempt to save to real DB if connected
        try {
            if (supabase) {
                const { error } = await supabase.from('products').insert({
                    title: newProduct.title,
                    description: newProduct.description,
                    price: newProduct.price,
                    stock_quantity: newProduct.stock_quantity,
                    category_id: newProduct.category_id,
                    images: newProduct.images
                });
                if (error) console.error("Failed to save to DB:", error);
            }
        } catch (e) {
            console.warn("DB save failed, keeping local state only");
        }
    };
    const deleteProduct = async (id: string) => {
        // Optimistic update
        setProducts(prev => prev.filter(p => p.id !== id));

        try {
            if (supabase) {
                const { error } = await supabase.from('products').delete().eq('id', id);
                if (error) console.error("Failed to delete from DB:", error);
            }
        } catch (e) {
            console.warn("DB delete failed, keeping local state change");
        }
    };

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
