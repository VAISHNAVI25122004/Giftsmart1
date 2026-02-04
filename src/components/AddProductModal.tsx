import { useState } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useProducts } from '../context/ProductContext';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function AddProductModal({ isOpen, onClose, onSuccess }: AddProductModalProps) {
    const { addProduct } = useProducts();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category_id: '11111111-1111-1111-1111-111111111111', // Default to Gift Boxes
        stock_quantity: '10'
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    if (!isOpen) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            // Try to upload image if Supabase is configured
            if (imageFile) {
                try {
                    const fileExt = imageFile.name.split('.').pop();
                    const fileName = `${Math.random()}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('products')
                        .upload(filePath, imageFile);

                    if (uploadError) throw uploadError;

                    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
                    imageUrl = data.publicUrl;
                } catch (err) {
                    console.log("Image upload skipped (likely mock mode)");
                }
            }

            // Fallback: If upload failed (Mock Mode) but file exists, create a local object URL
            if (!imageUrl && imageFile) {
                imageUrl = URL.createObjectURL(imageFile);
            }

            // Use context to add product (Handles both Supabase and Mock)
            await addProduct({
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                stock_quantity: parseInt(formData.stock_quantity),
                category_id: formData.category_id,
                images: imageUrl
                    ? [
                        imageUrl, // User uploaded (Assumed Red/Default)
                        'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600', // Mock Blue
                        'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=600'  // Mock Gold
                    ]
                    : [
                        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600', // Default Red
                        'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600', // Mock Blue
                        'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?q=80&w=600'  // Mock Gold
                    ]
            });

            onSuccess();
            onClose();
            alert('Product added successfully!');
        } catch (error: any) {
            console.error('Failed to add product:', error);
            alert('Failed to add product. See console.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Add New Product</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input
                                required
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                required
                                type="number"
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                                value={formData.stock_quantity}
                                onChange={e => setFormData({ ...formData, stock_quantity: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category (ID)</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                            value={formData.category_id}
                            onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                        >
                            <option value="11111111-1111-1111-1111-111111111111">Gift Boxes</option>
                            <option value="22222222-2222-2222-2222-222222222222">Luxury</option>
                            <option value="33333333-3333-3333-3333-333333333333">Handcrafted</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-primary hover:bg-green-50 transition cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={e => setImageFile(e.target.files?.[0] || null)}
                            />
                            <Upload className="h-8 w-8 mb-2" />
                            <span className="text-sm">{imageFile ? imageFile.name : 'Click to upload image'}</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-green-700 transition flex justify-center items-center shadow-lg"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
