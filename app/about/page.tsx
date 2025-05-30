"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Heart, Leaf, Award, Users, Globe } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: <Leaf className="w-8 h-8 text-brand-gold" />,
      title: "Natural & Pure",
      description: "100% natural ingredients sourced ethically from sacred groves and traditional farms across India.",
    },
    {
      icon: <Heart className="w-8 h-8 text-brand-gold" />,
      title: "Crafted with Love",
      description:
        "Each product is handcrafted with pure intentions, blessed with ancient mantras and positive energy.",
    },
    {
      icon: <Award className="w-8 h-8 text-brand-gold" />,
      title: "Traditional Wisdom",
      description:
        "Rooted in 5000-year-old Ayurvedic traditions and aromatherapy practices passed down through generations.",
    },
    {
      icon: <Users className="w-8 h-8 text-brand-gold" />,
      title: "Community Impact",
      description:
        "Supporting local artisans and farmers while preserving ancient knowledge and sustainable practices.",
    },
  ]

  const milestones = [
    { year: "2018", event: "Founded with a vision to revive ancient aromatherapy" },
    { year: "2019", event: "Launched first zodiac-based perfume collection" },
    { year: "2020", event: "Expanded to essential oils and wellness blends" },
    { year: "2021", event: "Reached 10,000+ satisfied customers" },
    { year: "2022", event: "Introduced sustainable packaging initiatives" },
    { year: "2023", event: "Opened sacred workshop in Rishikesh" },
    { year: "2024", event: "Launched international shipping" },
  ]

  return (
    <div className="min-h-screen bg-brand-whisper pt-8">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Sparkles className="w-16 h-16 text-brand-gold mx-auto mb-6" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-brand-maroon mb-6">Our Sacred Journey</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Namoh Sundari was born from a deep reverence for ancient wisdom and a passion for bringing the healing
              power of sacred scents to modern souls seeking spiritual connection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Founder in meditation"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="font-playfair text-3xl font-bold text-brand-maroon">Meet Our Founder</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                "My journey began in the sacred temples of Varanasi, where I first experienced the transformative power
                of ancient aromatherapy. After years of studying under traditional masters and traveling across India to
                source the purest ingredients, I founded Namoh Sundari to share these sacred scents with the world."
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                "Each fragrance we create carries the essence of spiritual traditions, crafted with the same reverence
                and purity that has been passed down through generations. Our mission is to help souls reconnect with
                their divine essence through the power of sacred scents."
              </p>
              <div className="pt-4">
                <p className="font-playfair text-xl font-semibold text-brand-maroon">Priya Sundari</p>
                <p className="text-brand-gold font-medium">Founder & Master Aromatherapist</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-brand-sandstone/20 to-brand-whisper">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-maroon mb-6">Our Sacred Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every aspect of our work is guided by these fundamental principles that honor both tradition and
              sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">{value.icon}</div>
                    <h3 className="font-playfair text-xl font-semibold text-brand-maroon mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-maroon mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small vision to a growing community of souls seeking authentic spiritual fragrances.
            </p>
          </motion.div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className="flex-1">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-brand-gold flex items-center justify-center">
                          <span className="font-bold text-brand-maroon">{milestone.year}</span>
                        </div>
                        <p className="text-lg text-gray-700 flex-1">{milestone.event}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-brand-lavender/10 to-brand-whisper">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Globe className="w-16 h-16 text-brand-gold mx-auto mb-6" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-brand-maroon mb-6">
              Join Our Sacred Community
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Become part of a growing family of souls who have discovered the transformative power of sacred scents.
              Together, we're preserving ancient wisdom while creating a more mindful, connected world.
            </p>
            <Button
              size="lg"
              className="bg-brand-maroon hover:bg-brand-maroon/90 text-white px-8 py-4 text-lg font-medium rounded-full"
            >
              Explore Our Collection
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
