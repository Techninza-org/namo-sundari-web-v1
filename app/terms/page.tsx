// pages/terms.js
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Terms and Conditions | Your Perfume Business</title>
        <meta
          name="description"
          content="Terms and conditions for our perfume business"
        />
      </Head>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to [Your Perfume Business Name]. These Terms and
              Conditions outline the rules and regulations for the use of our
              website and the purchase of our products.
            </p>
            <p className="text-gray-700">
              By accessing this website and/or placing an order, you agree to be
              bound by these Terms and Conditions. If you disagree with any part
              of these terms, please do not use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              2. Products
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>All perfume products are subject to availability.</li>
              <li>
                We reserve the right to discontinue any product at any time.
              </li>
              <li>
                Product descriptions and images are for illustrative purposes
                only.
              </li>
              <li>
                We make every effort to display colors and packaging as
                accurately as possible, but cannot guarantee that your device's
                display will be accurate.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3. Orders and Payment
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                By placing an order, you are offering to purchase a product
                subject to these Terms.
              </li>
              <li>
                We reserve the right to refuse or cancel any order for any
                reason.
              </li>
              <li>Prices are subject to change without notice.</li>
              <li>
                All payments are processed securely. We do not store credit card
                details.
              </li>
              <li>Sales tax will be added where applicable.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              4. Shipping and Delivery
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Shipping times are estimates and not guaranteed.</li>
              <li>
                We are not responsible for delays due to customs or other
                unforeseen circumstances.
              </li>
              <li>Risk of loss passes to you upon delivery to the carrier.</li>
              <li>
                Some locations may have shipping restrictions for alcohol-based
                perfumes.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              5. Returns and Refunds
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                Due to the nature of perfume products, we only accept returns
                for damaged or defective items.
              </li>
              <li>
                You must contact us within 7 days of receiving your order to
                request a return.
              </li>
              <li>
                Returned items must be in their original condition and
                packaging.
              </li>
              <li>
                Refunds will be processed within 14 days of receiving the
                returned item.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700">
              All content on this website, including text, graphics, logos, and
              images, is our property and protected by copyright laws. You may
              not use our trademarks or copyrighted material without our express
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-4">
              [Your Perfume Business Name] shall not be liable for any indirect,
              incidental, special, or consequential damages resulting from the
              use or inability to use our products.
            </p>
            <p className="text-gray-700">
              Some jurisdictions do not allow the exclusion or limitation of
              liability, so the above limitations may not apply to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              8. Privacy
            </h2>
            <p className="text-gray-700">
              Your privacy is important to us. Please review our{" "}
              <a
                href="/privacy"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Privacy Policy
              </a>{" "}
              which explains how we collect, use, and protect your personal
              information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              9. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting to the website. Your
              continued use of the site after changes constitutes acceptance of
              the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              10. Contact Information
            </h2>
            <p className="text-gray-700">
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="not-italic mt-2 text-gray-700">
              [Your Business Name]
              <br />
              [Your Address]
              <br />
              [City, State, ZIP Code]
              <br />
              Email:{" "}
              <a
                href="mailto:contact@yourbusiness.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                contact@yourbusiness.com
              </a>
              <br />
              Phone: [Your Phone Number]
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
