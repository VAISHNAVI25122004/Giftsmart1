
export default function TermsAndConditions() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">1. Acceptance of Terms</h2>
                    <p>By accessing or using our website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">2. Use License</h2>
                    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Giftshopsmart's website for personal, non-commercial transitory viewing only.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">3. Disclaimer</h2>
                    <p>The materials on Giftshopsmart's website are provided on an 'as is' basis. Giftshopsmart makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">4. Limitations</h2>
                    <p>In no event shall Giftshopsmart or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Giftshopsmart's website.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">5. Governing Law</h2>
                    <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the company is based and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
                </section>
            </div>
        </div>
    );
}
