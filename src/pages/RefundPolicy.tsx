
export default function RefundPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Returns</h2>
                    <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
                    <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Refunds (if applicable)</h2>
                    <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
                    <p>If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Sale Items</h2>
                    <p>Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Exchanges</h2>
                    <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at support@giftshopsmart.com.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Shipping Returns</h2>
                    <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
                </section>
            </div>
        </div>
    );
}
