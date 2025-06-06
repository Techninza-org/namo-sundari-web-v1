import React from 'react';

const CertificatePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ISO 9001:2015 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates.jpg"
              alt="ISO 9001:2015"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic uppercase">Iso certification</h3>
          </div>

          {/* Made in India */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates1.jpg"
              alt="Made in India"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">MADE IN INDIA</h3>
          </div>

          {/* KVIC */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates2.jpg"
              alt="KVIC"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">KVIC</h3>
          </div>

          {/* WHO-GMP */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates3.jpg"
              alt="WHO-GMP"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">WHO-GMP</h3>
          </div>

          {/* Halal India */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates4.jpg"
              alt="Halal India"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">HALAL INDIA</h3>
          </div>

          {/* EIACI */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/certificates5.jpg"
              alt="EIACI"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">EIACI</h3>
          </div>

          {/* IAS & IAF */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/cetificates6.jpeg"
              alt="IAS & IAF"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">IAS & IAF</h3>
          </div>

          {/* ISO 14001:2015 */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src="/cetificates7.jpeg"
              alt="ISO 14001:2015"
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
            <h3 className="text-lg font-semibold text-gray-800 italic">ISO 14001:2015</h3>
          </div>

        </div>
      </main>

      {/* Contact Us Floating Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors">
          <div className="w-6 h-6 flex items-center justify-center">
            💬
          </div>
        </button>
      </div>
    </div>
  );
};

export default CertificatePage;
