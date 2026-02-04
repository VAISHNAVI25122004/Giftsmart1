
export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, shipping address, and payment information.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you about your orders and our products.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Information Sharing</h2>
                    <p>We do not sell your personal information. We may share your information with third-party service providers who help us operate our business, such as payment processors and shipping partners.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Security</h2>
                    <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at support@giftshopsmart.com.</p>
                </section>
            </div>
        </div>
    );
}
