// pages/privacy.js
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Privacy Policy | Élégance Parfums</title>
        <meta
          name="description"
          content="Our commitment to your privacy at Élégance Parfums"
        />
      </Head>

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-none shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-light text-gray-900 mb-4 tracking-wide">
            Privacy Policy
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
            <p className="text-gray-600 leading-relaxed">
              Welcome to Élégance Parfums. We are committed to protecting your
              privacy with the same care and attention to detail that we apply
              to crafting our luxury fragrances. Your personal information is
              handled with the utmost discretion and security.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              2. Information We Collect
            </h2>
            <ul className="list-none pl-0 space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Personal details provided during purchases (name, contact
                  information, payment details)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Technical data including IP address, browser type, and device
                  information
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <span>
                  Preferences and interactions collected through cookies and
                  similar technologies
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              3. How We Use Your Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-600">
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Order Fulfillment
                </h3>
                <p className="text-sm">
                  Processing your purchases and delivering your luxury
                  fragrances
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Client Communication
                </h3>
                <p className="text-sm">
                  Providing order updates and exclusive offers (with your
                  consent)
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Service Enhancement
                </h3>
                <p className="text-sm">
                  Improving your experience with Élégance Parfums
                </p>
              </div>
              <div className="bg-gray-50 p-5">
                <h3 className="font-medium mb-2 text-gray-700">
                  Legal Compliance
                </h3>
                <p className="text-sm">Meeting our regulatory obligations</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              4. Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We employ enterprise-grade security measures to safeguard your
              personal information. All transactions are encrypted using SSL
              technology, and access to your data is strictly limited to
              authorized personnel.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              5. Your Rights
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
                  Right to access and receive a copy of your personal data
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
                  Right to request correction of inaccurate information
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
                  Right to withdraw consent for marketing communications
                </span>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-light text-gray-800 mb-6 tracking-wide border-b border-gray-100 pb-2">
              6. Contact Our Privacy Office
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              For any inquiries regarding your personal data or this policy,
              please contact our Privacy Office:
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
                  href="mailto:privacy@eleganceparfums.com"
                  className="border-b border-gray-300 hover:border-gray-500 transition-colors"
                >
                  privacy@eleganceparfums.com
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
