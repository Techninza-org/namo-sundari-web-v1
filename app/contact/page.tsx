"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formBody = new URLSearchParams();
      formBody.append("name", formData.name);
      formBody.append("email", formData.email);
      formBody.append("phone", formData.phone);
      formBody.append("subject", formData.subject);
      formBody.append("message", formData.message);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/add-contact-form`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } catch (err) {
      setError("There was an error submitting your form. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-brand-gold" />,
      title: "Email Us",
      details: ["hello@namohsundari.com", "support@namohsundari.com"],
      description: "Get in touch for any queries or support",
    },
    {
      icon: <Phone className="w-6 h-6 text-brand-gold" />,
      title: "Call Us",
      details: ["+91 98765 43210", "+91 87654 32109"],
      description: "Speak with our aromatherapy experts",
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-gold" />,
      title: "Visit Us",
      details: ["Sacred Workshop", "Rishikesh, Uttarakhand, India"],
      description: "Experience our fragrances in person",
    },
    {
      icon: <Clock className="w-6 h-6 text-brand-gold" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here to help during these hours",
    },
  ];

  const faqs = [
    {
      question: "How are your products made?",
      answer:
        "All our products are handcrafted using traditional methods passed down through generations. We use only natural, ethically sourced ingredients and infuse each product with positive intentions and ancient mantras.",
    },
    {
      question: "Are your products alcohol-free?",
      answer:
        "Yes, all our perfumes and attars are completely alcohol-free. We use natural carrier oils and traditional distillation methods to create long-lasting, pure fragrances.",
    },
    {
      question: "How do I choose the right zodiac scent?",
      answer:
        "Each zodiac sign has unique energy patterns. Our zodiac collection is carefully crafted to align with these energies. You can choose based on your sun sign, or explore scents that resonate with your current spiritual journey.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship worldwide! We carefully package each order to ensure your sacred scents reach you in perfect condition. Shipping times vary by location, typically 7-14 business days internationally.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened products for a full refund. Opened products can be exchanged within 15 days.",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="w-16 h-16 text-brand-gold mx-auto mb-6" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-brand-maroon mb-6">
              Connect With Us
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Whether you have questions about our
              products, need guidance on your spiritual journey, or want to
              share your experience, we're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">{info.icon}</div>
                    <h3 className="font-playfair text-xl font-semibold text-brand-maroon mb-4">
                      {info.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h2 className="font-playfair text-3xl font-bold text-brand-maroon mb-6">
                    Send Us a Message
                  </h2>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-playfair text-2xl font-semibold text-brand-maroon mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for reaching out. We'll get back to you within
                        24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-red-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-red-700">{error}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-brand-maroon font-medium"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            required
                            className="mt-2"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-brand-maroon font-medium"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                            className="mt-2"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-brand-maroon font-medium"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="mt-2"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="subject"
                            className="text-brand-maroon font-medium"
                          >
                            Subject *
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) =>
                              handleInputChange("subject", value)
                            }
                            required
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="product-inquiry">
                                Product Inquiry
                              </SelectItem>
                              <SelectItem value="order-support">
                                Order Support
                              </SelectItem>
                              <SelectItem value="zodiac-guidance">
                                Zodiac Guidance
                              </SelectItem>
                              <SelectItem value="wholesale">
                                Wholesale Inquiry
                              </SelectItem>
                              <SelectItem value="collaboration">
                                Collaboration
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="message"
                          className="text-brand-maroon font-medium"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          required
                          className="mt-2 min-h-[120px]"
                          placeholder="Tell us how we can help you on your spiritual journey..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-brand-maroon hover:bg-brand-maroon/90 text-white py-3 text-lg font-medium rounded-full"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="w-5 h-5 ml-2" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-3xl font-bold text-brand-maroon mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <h3 className="font-playfair text-lg font-semibold text-brand-maroon mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
