
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Play, Camera, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { usePhotos } from "@/hooks/usePhotos"
import { useHomeVideos } from "@/hooks/useVideos"
import { PhotoLightbox } from "@/components/gallery/PhotoLightbox"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"

type MediaItem = {
  type: "photo" | "video"
  id: string
  category_id: string
  title: string | null
  description: string | null
  image_url?: string
  thumbnail_url?: string | null
  alt_text?: string | null
  youtube_url?: string
  youtube_id?: string
  custom_thumbnail_url?: string | null
  duration?: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  view_count?: number
  created_at: string
  updated_at: string
  category_name?: string
}

type PhotoForLightbox = {
  id: string
  image_url: string
  title: string | null
  description: string | null
  alt_text: string
  category_name?: string
}

export function FeaturedGallery() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const { data: featuredPhotos, isLoading: photosLoading } = usePhotos()
  const { data: featuredVideos, isLoading: videosLoading } = useHomeVideos()

  const isLoading = photosLoading || videosLoading

  // Combine and sort media items
  const mediaItems: MediaItem[] = [
    ...(featuredPhotos?.filter(photo => photo.is_home_featured).map(photo => ({
      type: "photo" as const,
      ...photo,
    })) || []),
    ...(featuredVideos?.map(video => ({
      type: "video" as const,
      ...video,
    })) || []),
  ].sort((a, b) => {
    // Sort by display_order first, then by created_at
    if (a.display_order !== b.display_order) {
      return a.display_order - b.display_order
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const handleMediaClick = (media: MediaItem, index: number) => {
    if (media.type === "photo") {
      setSelectedMedia(media)
      setLightboxIndex(index)
    } else if (media.type === "video" && media.youtube_url) {
      window.open(media.youtube_url, "_blank")
    }
  }

  const photoItems: PhotoForLightbox[] = mediaItems
    .filter(item => item.type === "photo")
    .map(item => ({
      id: item.id,
      image_url: item.image_url!,
      title: item.title,
      description: item.description,
      alt_text: item.alt_text || item.title || "Photo",
      category_name: item.category_name,
    }))

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No featured content yet</h3>
        <p className="text-gray-500">Featured photos and videos will appear here</p>
      </div>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Gallery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most captivating moments and stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaItems.map((media, index) => (
            <motion.div
              key={`${media.type}-${media.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div 
                  className="relative"
                  onClick={() => handleMediaClick(media, photoItems.findIndex(p => p.id === media.id))}
                >
                  <AspectRatio ratio={4/3}>
                    <Image
                      src={
                        media.type === "photo"
                          ? media.image_url || "/placeholder.svg"
                          : media.custom_thumbnail_url || 
                            `https://img.youtube.com/vi/${media.youtube_id}/maxresdefault.jpg`
                      }
                      alt={media.type === "photo" ? (media.alt_text || media.title || "Photo") : (media.title || "Video")}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </AspectRatio>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button size="lg" variant="secondary" className="bg-white/90 text-gray-900">
                      {media.type === "photo" ? (
                        <>
                          <Camera className="w-5 h-5 mr-2" />
                          View Photo
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Watch Video
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Media type badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant={media.type === "photo" ? "default" : "destructive"}>
                      {media.type === "photo" ? (
                        <>
                          <Camera className="w-3 h-3 mr-1" />
                          Photo
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </>
                      )}
                    </Badge>
                  </div>

                  {/* Duration for videos */}
                  {media.type === "video" && media.duration && (
                    <div className="absolute bottom-3 right-3">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {media.duration}
                      </span>
                    </div>
                  )}

                  {/* View count for videos */}
                  {media.type === "video" && media.view_count !== undefined && (
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {media.view_count} views
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    {media.title && (
                      <h3 className="font-semibold text-lg line-clamp-1">{media.title}</h3>
                    )}
                    {media.description && (
                      <p className="text-gray-600 text-sm line-clamp-2">{media.description}</p>
                    )}
                    {media.category_name && (
                      <p className="text-xs text-purple-600 font-medium">{media.category_name}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Photo Lightbox */}
        {selectedMedia && selectedMedia.type === "photo" && (
          <PhotoLightbox
            photos={photoItems}
            currentIndex={lightboxIndex}
            onClose={() => setSelectedMedia(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </div>
    </section>
  )
}
