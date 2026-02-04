export interface User {
    id: string;
    email: string | null;
    displayName: string | null;
    role: 'admin' | 'customer';
}

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    discount_price?: number;
    rating: number;
    images: string[];
    category_id: string;
    stock_quantity: number;
    variants?: {
        type: string;
        options: string[];
    };
}

export interface CartItem extends Product {
    quantity: number;
    selectedVariant?: string;
}

export interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'placed' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    items: CartItem[];
}
