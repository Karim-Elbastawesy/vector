"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css'
import Image from 'next/image'

interface SliderLabel {
    title: string
    subtitle?: string
}

export default function MySlider({ slidesPerView, pageList, labels }: {
    slidesPerView: number
    pageList: string[]
    labels?: SliderLabel[]
}) {
    return (
        <Swiper
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={slidesPerView}
            navigation
            pagination={{
                clickable: true,
                renderBullet(index, className) {
                    return `<span class='${className}'></span>`
                },
            }}
            className="rounded-3xl overflow-hidden"
        >
            {pageList.map((img, index) => (
                <SwiperSlide key={img}>
                    <div className="relative w-full h-[420px]">
                        <Image src={img} alt="slide" fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/60 via-black/10 to-transparent rounded-3xl" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent rounded-3xl" />

                        {labels?.[index] && (
                            <div className="absolute bottom-10 left-8 flex flex-col gap-2">
                                <p className="text-white font-bold text-3xl drop-shadow-lg">{labels[index].title}</p>
                                {labels[index].subtitle && (
                                    <p className="text-amber-300 text-sm">{labels[index].subtitle}</p>
                                )}
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}