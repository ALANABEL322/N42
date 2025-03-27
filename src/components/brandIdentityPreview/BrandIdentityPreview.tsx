"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Image } from "lucide-react"
import { motion } from "framer-motion"

interface BrandIdentityPreviewProps {
  brandName?: string
  slogan?: string
  colorPalette?: {
    cian: string
    magenta: string
    amarillo: string
    negro: string
  }
  typography?: string
  mockupImages?: string[]
  className?: string
}

export default function BrandIdentityPreview({
  brandName = "Nombre de la marca",
  slogan = "Lorem ipsum dolor sit amet consectetur adipiscing elit praesent molestie placerat semper velit pellentesque euismod pharetra.",
  colorPalette = {
    cian: "#E0F7FA",
    magenta: "#FCE4EC",
    amarillo: "#FFFDE7",
    negro: "#F5F5F5",
  },
  typography = "Inter",
  mockupImages = [],
  className,
}: BrandIdentityPreviewProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      className={`w-full max-w-3xl mx-auto ${className || ""}`}
    >
      <motion.div variants={item} className="text-center mb-6 mt-20">
        <h1 className="text-4xl font-bold mb-2">Título de sección</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{slogan}</p>
      </motion.div>

      <motion.div variants={item}>
        <Card className="bg-[#FFF5F5] border-0 shadow-sm mb-6">
          <CardContent className="flex items-center justify-center p-16">
            <div className="text-2xl font-bold text-gray-500">LOGO</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item} className="mb-6">
        <h2 className="text-2xl font-medium mb-3 mt-20">Paleta de colores utilizadas</h2>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col">
            <div
              className="h-16 rounded-lg mb-1"
              style={{ backgroundColor: colorPalette.cian }}
              aria-label="Color Cian"
            />
            <span className="text-sm text-center text-gray-600">Cian</span>
          </div>
          <div className="flex flex-col">
            <div
              className="h-16 rounded-lg mb-1"
              style={{ backgroundColor: colorPalette.magenta }}
              aria-label="Color Magenta"
            />
            <span className="text-sm text-center text-gray-600">Magenta</span>
          </div>
          <div className="flex flex-col">
            <div
              className="h-16 rounded-lg mb-1"
              style={{ backgroundColor: colorPalette.amarillo }}
              aria-label="Color Amarillo"
            />
            <span className="text-sm text-center text-gray-600">Amarillo</span>
          </div>
          <div className="flex flex-col">
            <div
              className="h-16 rounded-lg mb-1"
              style={{ backgroundColor: colorPalette.negro }}
              aria-label="Color Negro"
            />
            <span className="text-sm text-center text-gray-600">Negro</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="mb-6">
        <h2 className="text-2xl font-medium mb-3 mt-20">Tipografía utilizada y variables</h2>
        <div className="flex items-start gap-6">
          <div className="text-6xl font-bold" style={{ fontFamily: typography }}>
            Aa
          </div>
          <div className="text-sm pt-2" style={{ fontFamily: typography }}>
            <div>Aa Bb Cc Ee Ff Gg Hh</div>
            <div>Ii Jj Kk Ll Mm Nn Oo</div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-medium mb-3 mt-20">Mockups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {[0, 1].map((index) => (
            <div
              key={`mockup-${index}`}
              className="aspect-[4/3] bg-[#FFF5F5] rounded-lg flex items-center justify-center"
            >
              {mockupImages[index] ? (
                <img
                  src={mockupImages[index] || "/placeholder.svg"}
                  alt={`Mockup ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <Image className="w-12 h-12 text-[#A52A2A] opacity-50" />
              )}
            </div>
          ))}
        </div>
        <div className="aspect-[16/9] mb-10 bg-[#FFF5F5] rounded-lg flex items-center justify-center">
          {mockupImages[2] ? (
            <img
              src={mockupImages[2] || "/placeholder.svg"}
              alt="Mockup 3"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Image className="w-16 h-16 text-[#A52A2A] opacity-50" />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

