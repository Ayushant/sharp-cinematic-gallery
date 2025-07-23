
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PhotoLightbox } from "@/components/gallery/PhotoLightbox"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { EmptyState } from "@/components/common/EmptyState"
import { usePhotos } from "@/hooks/usePhotos"
import type { Photo } from "@/lib/supabase"

interface FeaturedGalleryProps {
  section: string
  title: string
  description: string
}

export function FeaturedGallery({ section, title, description }: FeaturedGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: photos, isLoading } = usePhotos(selectedCategory || undefined)

  // Filter photos based on section
  const filteredPhotos = photos?.filter(photo => {
    if (section === 'featured') return photo.is_featured
    if (section === 'home') return photo.is_home_featured
    return true
  }) || []

  const handlePhotoClick = (index: number) => {
    setLightboxIndex(index)
  }

  const handleCloseLightbox = () => {
    setLightboxIndex(-1)
  }

  const handleNavigateLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === 'masonry' ? 'default' : 'outline'}
            onClick={() => setViewMode('masonry')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Masonry View
          </Button>
        </div>

        {/* Gallery */}
        {filteredPhotos.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  viewMode === 'masonry' ? 'break-inside-avoid' : ''
                }`}
                onClick={() => handlePhotoClick(index)}
              >
                <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
                  <Image
                    src={photo.image_url || "/placeholder.svg"}
                    alt={photo.alt_text || photo.title || "Photography"}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  {/* Featured badge */}
                  {photo.is_featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                  
                  {/* Title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-medium text-sm">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">{photo.description}</p>
                    )}
                  </div>
                </div>
                
                {/* Photo info */}
                <div className="mt-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{photo.title || 'Untitled'}</h3>
                    {photo.category_name && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                        {photo.category_name}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(photo.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {photo.is_home_featured ? 'Home' : 'Gallery'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No photos found"
            description="No featured photos have been added yet. Check back soon for amazing photography!"
          />
        )}

        {/* Lightbox */}
        {filteredPhotos.length > 0 && (
          <PhotoLightbox
            photos={filteredPhotos}
            currentIndex={lightboxIndex}
            isOpen={lightboxIndex >= 0}
            onClose={handleCloseLightbox}
            onNavigate={handleNavigateLightbox}
          />
        )}
      </div>
    </section>
  )
}
