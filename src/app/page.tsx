import React from 'react'
import Products from './_components/Products/Products'
import slider1 from '../assets/slider.jpg'
import slider2 from '../assets/slider3.jpg'
import slider3 from '../assets/deliverym.png'
import MySlider from './_components/Slider/Slider'
import Categories from './categories/Categories'
import Image from 'next/image'
import contactUs from "../../public/contactUs.jpg"
import shopNow from "../../public/shopNow.jpg"
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import InfoCards from './_components/infoCards/InfoCards'

export default function Home() {
  return (
    <div>
        
      <div className='block lg:flex pt-4 items-center gap-5'>
        <div className='w-full lg:w-3/4'>
          <MySlider
            pageList={[slider1.src, slider2.src, slider3.src]}
            slidesPerView={1}
            labels={[
              { title: "New Arrivals", subtitle: "Shop the latest collection" },
              { title: "Big Sale", subtitle: "Up to 50% off selected items" },
              { title: "Fast Delivery", subtitle: "Order now, get it tomorrow" },
            ]}
          />
        </div>

        <div className="w-full mt-5 lg:mt-0 lg:w-3/4 flex flex-col gap-4 h-135 lg:h-[420px]">
          <Link href="/contact" className="relative flex-1 rounded-3xl overflow-hidden group block">
            <Image
              src={contactUs}
              alt="Contact us"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold  text-sm leading-tight">Contact us now!</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-amber-400 group-hover:border-l-2 border-amber-400 group-hover:pl-2 transition-all  text-xs">Get in touch</span>
                <ArrowRight className="w-3 h-3 text-amber-400 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          <Link href="/categories" className="relative flex-1 rounded-3xl overflow-hidden group block">
            <Image
              src={shopNow}
              alt="Shop now"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t  from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm leading-tight">Shop Now</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-amber-400 group-hover:border-l-2 border-amber-400 group-hover:pl-2 transition-all text-xs">Browse all</span>
                <ArrowRight className="w-3 h-3 text-amber-400 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
      <InfoCards/>
      <Categories />
      <Products />
    </div>
  )
}