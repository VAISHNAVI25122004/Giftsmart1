
export default function ShippingPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Order Processing</h2>
                    <p>All orders are processed within 1 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Shipping Rates</h2>
                    <p>Shipping charges for your order will be calculated and displayed at checkout. We offer free standard shipping on all orders over ₹2000.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Domestic Shipping Estimates</h2>
                    <p>For standard shipping: 5-7 business days.<br />
                        For express shipping: 2-3 business days.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. International Shipping</h2>
                    <p>We actively ship to many international locations. Shipping times will vary depending on the destination country. Please note that your order may be subject to import duties and taxes (including VAT), which are incurred once a shipment reaches your destination country. Giftshopsmart is not responsible for these charges if they are applied and are your responsibility as the customer.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Checking Order Status</h2>
                    <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
                </section>
            </div>
        </div>
    );
}
