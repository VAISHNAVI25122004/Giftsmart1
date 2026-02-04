
import { Gift, Heart, Users, Globe } from 'lucide-react';

export default function About() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    About Giftshopsmart
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                    Spreading joy, one thoughtful gift at a time.
                </p>
            </div>

            {/* Our Story */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop"
                        alt="Gift wrapping"
                        className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                    />
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                    <p className="text-lg text-gray-600">
                        Founded in 2024, Giftshopsmart began with a simple mission: to make gifting effortless and meaningful. We believe that the perfect gift has the power to strengthen bonds and create lasting memories.
                    </p>
                    <p className="text-lg text-gray-600">
                        What started as a small curated collection has grown into a diverse marketplace of unique, high-quality items suitable for every occasion, from corporate milestones to personal celebrations.
                    </p>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-green-50 rounded-3xl p-12 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center transform hover:-translate-y-1 transition duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <Gift className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Curated Selection</h3>
                        <p className="text-gray-600">
                            We handpick every item in our store to ensure quality, uniqueness, and delight.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center transform hover:-translate-y-1 transition duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-6">
                            <Heart className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Made with Love</h3>
                        <p className="text-gray-600">
                            We partner with artisans and creators who pour passion into their craft.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center transform hover:-translate-y-1 transition duration-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Customer First</h3>
                        <p className="text-gray-600">
                            Your happiness is our priority. Our support team is always here to help.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team/Contact Teaser */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Be the first to know about new arrivals, special offers, and gifting tips.
                </p>
                <div className="flex justify-center space-x-4">
                    <div className="flex items-center text-gray-500">
                        <Globe className="w-5 h-5 mr-2" />
                        <span>Shipping Worldwide</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
