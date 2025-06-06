"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Heart, Users, Gift, Star, Sun, Moon, Zap, LucideOctagonPause } from 'lucide-react';

const HolisticWellness = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const spiritualServices = [
    "Cultivate your inner self",
    "Reiki Healing sessions", 
    "Chakra Meditation practices",
    "Sound Bath therapy",
    "Kundalini Meditation",
    "Channel pure Divine life energy",
    "Learn to negate toxic elements",
    "Discover inner happiness and joy"
  ];

  const blissfulServices = [
    "Forgive & Forget techniques",
    "Anger Management coaching",
    "Life Skills development",
    "Develop a Positive Attitude",
    "Practice Mindful Awareness",
    "Build Emotional Intelligence",
    "Learn to Increase Focus & Concentration",
    "Counseling for Life's Challenges",
    "Strengthen Relationships with loved ones"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-indigo-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-violet-500/20 rounded-full blur-xl animate-bounce delay-500"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-white/20 rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        <div className={`relative z-10 text-center px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center mb-6">
            <LucideOctagonPause className="w-16 h-16 text-purple-300 animate-spin-slow" />
          </div>
          <h1 className="text-6xl md:text-8xl font-thin text-white mb-6 tracking-wider">
            HOLISTIC
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              WELLNESS
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Transform your life through ancient wisdom and modern practices. Discover inner peace, vibrant health, and spiritual awakening.
          </p>
          <div className="flex justify-center animate-bounce mt-12">
            <ChevronDown className="w-8 h-8 text-purple-300" />
          </div>
        </div>
      </section>

      {/* Spiritual Living Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Sun className="w-12 h-12 text-orange-500 animate-pulse" />
            </div>
            <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">
              SPIRITUAL LIVING
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-800">Spiritual Awakening</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn to master your own divine knowledge and embrace your spiritual path. We emphasize the importance of building inner resources and clear thoughts to unlock your highest potential.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {spiritualServices.map((service, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700 bg-purple-50 rounded-lg p-3 hover:bg-purple-100 transition-colors">
                      <Star className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
                  Begin Your Journey
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Moon className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                    <h4 className="text-2xl font-light">Inner Peace</h4>
                    <p className="text-purple-100 mt-2">Through Meditation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blissful Living Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-rose-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-40 h-40 bg-rose-200/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Heart className="w-12 h-12 text-rose-500 animate-pulse" />
            </div>
            <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">
              BLISSFUL LIVING
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <div className="aspect-square bg-gradient-to-br from-rose-400 to-orange-400 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Zap className="w-24 h-24 mx-auto mb-4 animate-pulse" />
                    <h4 className="text-2xl font-light">Positive Energy</h4>
                    <p className="text-rose-100 mt-2">Transform Your Life</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-500">
                <div className="flex items-center mb-6">
                  <Heart className="w-8 h-8 text-rose-600 mr-3" />
                  <h3 className="text-2xl font-semibold text-gray-800">Emotional Wellness</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  To begin the road to blissful living, remember to be optimistic. We guide you through positive emotions and help develop awareness to handle emotions and grow from life experiences.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {blissfulServices.map((service, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700 bg-rose-50 rounded-lg p-3 hover:bg-rose-100 transition-colors">
                      <Star className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-gradient-to-r from-rose-600 to-orange-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
                  Start Transformation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Celebration Services Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-amber-50 to-yellow-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Gift className="w-12 h-12 text-amber-600 animate-bounce" />
          </div>
          <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">
            CELEBRATION SERVICES
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full mb-12"></div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 hover:transform hover:scale-105 transition-all duration-500">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center shadow-lg">
              <Users className="w-16 h-16 text-white" />
            </div>
            
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Sacred Celebrations</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Certain things in life are more valuable than just money, such as friends, family, good memories, love, humor, bridging bonds with your significant other, loyalty & devotion of your pets towards your smiles, growing old with someone you love and living your life the best way.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 rounded-2xl p-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-3">Life Celebrations</h4>
                <p className="text-gray-600 text-sm">Inspire all their history, stay true with warmth in their heart and soul.</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-3">Sacred Rituals</h4>
                <p className="text-gray-600 text-sm">Blessings, Hugs, and Smiles are complimentary from our heart.</p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-10 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-lg">
              Plan Celebration
            </button>
          </div>
        </div>
      </section>

      {/* CSR Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-36 h-36 bg-green-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-44 h-44 bg-teal-200/20 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-4">
            <Heart className="w-12 h-12 text-green-600 animate-pulse" />
          </div>
          <h2 className="text-5xl font-light text-gray-800 mb-4 tracking-wide">
            YOUR WAY TO CSR
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mb-12"></div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
            <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto">
              Fulfill the goodness of your company through a blissful experience. Corporate social responsibility, directly or indirectly, helps in making this contribution to the needy. Contribute to the betterment and welfare of society and our country.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#donate-isha"
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
              >
                Donate for Isha Sanchantna
              </a>
              <a
                href="#adopt-cow"
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full hover:bg-green-600 hover:text-white hover:scale-105 transition-all duration-300 font-medium"
              >
                Adopt a Cow
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HolisticWellness;