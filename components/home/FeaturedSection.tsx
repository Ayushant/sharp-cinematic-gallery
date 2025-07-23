
"use client"

import { FeaturedGallery } from "./FeaturedGallery"

interface FeaturedSectionProps {
  section: string
  title: string
  description: string
}

export function FeaturedSection({ section, title, description }: FeaturedSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <FeaturedGallery />
      </div>
    </section>
  )
}
