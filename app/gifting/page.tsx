import React from 'react';
import { Search, ShoppingCart, Menu } from 'lucide-react';

const GiftingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
    

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Gift Boxes */}
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 transform rotate-12 rounded-3xl"></div>
            </div>
            
            {/* Gift Boxes Stack */}
            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Top Gift Box */}
              <div className="w-32 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full relative">
                  {/* Hearts pattern */}
                  <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-1 p-2">
                    <div className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
                    <div className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
                  </div>
                  {/* Ribbon */}
                  <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-700 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-6 h-8 bg-gray-700 transform -translate-y-1/2 translate-x-2">
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-6 border-r-0 border-b-4 border-l-gray-700 border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Middle Gift Box */}
              <div className="w-40 h-28 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full relative">
                  {/* Polka dots */}
                  <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 p-3">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
                    ))}
                  </div>
                  {/* Ribbon */}
                  <div className="absolute top-1/2 left-0 right-0 h-4 bg-gray-200 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-8 h-10 bg-gray-200 transform -translate-y-1/2 translate-x-3">
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-8 border-r-0 border-b-5 border-l-gray-200 border-b-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Bottom Gift Box */}
              <div className="w-48 h-32 bg-gradient-to-br from-purple-700 to-purple-800 rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-full h-full relative">
                  {/* Hearts pattern */}
                  <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-2 p-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-purple-300 rounded-full opacity-60"></div>
                    ))}
                  </div>
                  {/* Ribbon */}
                  <div className="absolute top-1/2 left-0 right-0 h-5 bg-white transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 right-0 w-10 h-12 bg-white transform -translate-y-1/2 translate-x-4">
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-l-10 border-r-0 border-b-6 border-l-white border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Large GIFTING Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-6xl lg:text-8xl font-bold text-white opacity-20 leading-none tracking-wider">
                GIFTING
              </h1>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Gift your loved ones the goodness of Paradise
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Looking for that soulful gift for your loved ones or corporate needs? You've come to the right place. Aroma Mysteries offers gift all occasions which signify charm, finesse and divinity
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Aroma Mysteries's Organic perfumes are not just different physically, but spiritually and energetically also.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Enhance your loved one's unique and splendid personality. To complement this aura, Aroma Mysteries has curated perfumes exclusively for each one of you
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Explore Gift Collection
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Us Button (WhatsApp Style) */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GiftingPage;