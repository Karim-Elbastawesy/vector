"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
    images: string[]
    title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handlePrev = () => {
        setSelectedIndex(prev => (prev - 1 + images.length) % images.length)
    }

    const handleNext = () => {
        setSelectedIndex(prev => (prev + 1) % images.length)
    }

    return (
        <>
            <div className="relative w-full bg-gray-50 rounded-2xl overflow-hidden aspect-square group">
                <Image
                    fill
                    alt={title}
                    className="object-contain p-6 transition-all duration-300"
                    src={images[selectedIndex]}
                    priority
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedIndex === index
                                    ? 'border-amber-500 scale-105'
                                    : 'border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            <div className="relative w-full h-full bg-gray-50">
                                <Image
                                    fill
                                    alt={`${title} thumbnail ${index + 1}`}
                                    className="object-contain p-1"
                                    src={img}
                                />
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}