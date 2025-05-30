"use client"

import { useEffect, useState } from "react"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  const announcements = [
    "Free shipping on orders above ₹1999",
    "Use code WELCOME10 for 10% off your first order",
    "Handcrafted with love | 100% natural ingredients",
    "Alcohol-free fragrances | Cruelty-free",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="announcement-bar">
      <div className="announcement-bar-content">
        {announcements.map((announcement, index) => (
          <span key={index} className="mx-8">
            {announcement}
          </span>
        ))}
      </div>
    </div>
  )
}
