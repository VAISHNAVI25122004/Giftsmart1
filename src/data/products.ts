import type { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'Premium Gift Box',
        description: 'A wonderful box perfect for corporate gifting and anniversaries.',
        price: 1200,
        rating: 4.8,
        images: [
            'https://plus.unsplash.com/premium_photo-1672233867034-8a3e331d6c2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVkJTIwZ2lmdCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1610334186654-893b57658c8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ymx1ZSUyMGdpZnQlMjBib3h8ZW58MHx8MHx8fDA%3D', // Blue-ish
            'https://images.unsplash.com/photo-1638460392258-27e2283cfafb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZCUyMGdpZnQlMjBib3h8ZW58MHx8MHx8fDA%3D'  // Gold-ish
        ],
        category_id: '1',
        stock_quantity: 10,
        variants: {
            type: 'Color',
            options: ['Red', 'Blue', 'Gold']
        }
    },
    {
        id: '2',
        title: 'Luxury Watch Set',
        description: 'Timeless elegance. Ideal for anniversaries and corporate milestones.',
        price: 4500,
        rating: 4.9,
        images: [
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=600',
            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600', // Dummy Blue
            'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600'  // Dummy Gold
        ],
        category_id: '2',
        stock_quantity: 5
    },
    {
        id: '3',
        title: 'Handcrafted Ceramic Mug',
        description: 'Ceramic beauty. Great for birthdays and casual gifts.',
        price: 350,
        rating: 4.5,
        images: [
            'https://images.unsplash.com/photo-1606423125989-d745da36eb05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlZCUyMG11Z3xlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1755638110931-3da1d1174c14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ymx1ZSUyMG11Z3xlbnwwfHwwfHx8MA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1669832845504-fffd51149aa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdvbGQlMjBtdWd8ZW58MHx8MHx8fDA%3D'
        ],
        category_id: '3',
        stock_quantity: 20,
        variants: {
            type: 'Color',
            options: ['Red', 'Blue', 'Gold']
        }
    },
    {
        id: '4',
        title: 'Scented Candles',
        description: 'Lavendar bliss. Perfect for festive seasons and birthdays.',
        price: 800,
        rating: 4.7,
        images: [
            'https://plus.unsplash.com/premium_photo-1679511318326-bc825f86279f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGF2ZW5kZXIlMjBjYW5kbGV8ZW58MHx8MHx8fDA%3D',
            'https://images.unsplash.com/photo-1634306954206-0b07090bf575?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFuaWxsYSUyMGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1675063046832-a2e1cbb7ddb1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9zZSUyMGNhbmRsZXxlbnwwfHwwfHx8MA%3D%3D'
        ],
        category_id: '4',
        stock_quantity: 15,
        variants: {
            type: 'Flavor',
            options: ['Lavender', 'Vanilla', 'Rose']
        }
    },
    {
        id: '5',
        title: 'Leather Wallet',
        description: 'Genuine leather. A classic corporate or anniversary gift.',
        price: 1500,
        rating: 4.6,
        images: [
            'https://images.unsplash.com/photo-1620109176813-e91290f6c795?q=80&w=600',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600',
            'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=600'
        ],
        category_id: '2',
        stock_quantity: 8
    },
    {
        id: '6',
        title: 'Chocolates Box',
        description: 'Sweet delights. A must-have for festivals and birthdays.',
        price: 600,
        rating: 4.8,
        images: [
            'https://images.unsplash.com/photo-1687795097254-f019f9d7fd17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwYm94fGVufDB8fDB8fHww'
        ],
        category_id: '1',
        stock_quantity: 30
    },
];
