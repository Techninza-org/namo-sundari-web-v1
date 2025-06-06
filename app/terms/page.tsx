// pages/terms.js
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Terms & Conditions | Élégance Parfums</title>
        <meta
          name="description"
          content="Terms and conditions for Élégance Parfums"
        />
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-none shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-light text-gray-900 mb-4 tracking-wide">
            Terms & Conditions
          </h1>
          <div className="border-t border-b border-gray-200 w-24 mx-auto my-4"></div>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Welcome to Élégance Parfums. These Terms and Conditions govern
              your use of our website and the purchase of our exclusive
              fragrance collections. By accessing our boutique online or placing
              an order, you acknowledge that you have read, understood, and
              agree to be bound by these terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Should you disagree with any provision of these terms, we
              respectfully ask that you refrain from using our website or
              purchasing our products.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              2. Our Fragrance Collection
            </h2>
            <ul className="list-none pl-0 space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  All fragrances are subject to availability in our limited
                  collections
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  We reserve the exclusive right to discontinue any fragrance
                  without notice
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Product imagery is presented for illustrative purposes only
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  While we endeavor to present colors and packaging accurately,
                  variations may occur due to device displays
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              3. Purchasing Terms
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Order Acceptance
                </h3>
                <p className="text-sm">
                  Each order represents an offer to purchase subject to our
                  acceptance
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Order Cancellation
                </h3>
                <p className="text-sm">
                  We reserve the right to decline any order at our discretion
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">Pricing</h3>
                <p className="text-sm">
                  All prices are subject to change without prior notification
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Payment Security
                </h3>
                <p className="text-sm">
                  Transactions are processed securely; we never store payment
                  details
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              4. Delivery of Your Fragrance
            </h2>
            <ul className="list-none pl-0 space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>Delivery timelines are provided as estimates only</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Customs delays or other external factors may affect delivery
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Ownership and risk transfer upon handover to the delivery
                  service
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Certain destinations may restrict alcohol-based fragrance
                  shipments
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              5. Returns & Exchanges
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Due to the intimate nature of fragrance products, we only
                  accept returns for damaged or defective items
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Return requests must be initiated within 7 days of delivery
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Items must be returned in original, unopened condition with
                  all packaging
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>
                  Refunds will be issued within 14 business days of receiving
                  the returned item
                </span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              6. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Élégance Parfums name, all product names, packaging designs,
              and website content constitute valuable intellectual property
              protected under international law. No portion of our website or
              product branding may be reproduced, distributed, or used without
              our express written authorization.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              7. Liability
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Élégance Parfums shall not be liable for any indirect, incidental,
              or consequential damages arising from product use or website
              access. Our total liability for any claim related to these terms
              shall not exceed the purchase price of the product in question.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Certain jurisdictions may not permit some liability limitations,
              which may affect the applicability of these provisions in your
              location.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              8. Privacy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We handle your personal information with the utmost discretion.
              Please review our{" "}
              <a
                href="/privacy"
                className="border-b border-gray-300 hover:border-gray-500 transition-colors"
              >
                Privacy Policy
              </a>{" "}
              to understand how we protect your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              9. Policy Updates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may periodically update these Terms to reflect changes in our
              business practices. Amendments become effective immediately upon
              posting. Your continued engagement with Élégance Parfums
              constitutes acceptance of the current Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              10. Contact Our Concierge
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              For inquiries regarding these Terms or any other matter, our
              client concierge is at your service:
            </p>
            <address className="not-italic text-gray-600">
              <div className="mb-3">
                <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Address
                </span>
                <span>Élégance Parfums</span>
                <br />
                <span>12 Rue de la Luxe</span>
                <br />
                <span>75001 Paris, France</span>
              </div>
              <div className="mb-3">
                <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Email
                </span>
                <a
                  href="mailto:concierge@eleganceparfums.com"
                  className="border-b border-gray-300 hover:border-gray-500 transition-colors"
                >
                  concierge@eleganceparfums.com
                </a>
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">
                  Phone
                </span>
                <span>+33 1 23 45 67 89</span>
              </div>
            </address>
          </section>

          <div className="text-center text-sm text-gray-400 mt-16 pt-6 border-t border-gray-100">
            © {new Date().getFullYear()} Élégance Parfums. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
