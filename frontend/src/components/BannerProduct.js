
import React, { useEffect, useState } from 'react'

import earbudsBanner from '../assets/assest/banner/earbudsBanner.jpg'
import neckbandsBanner from '../assets/assest/banner/neckbandsBanner.jpg'
import headphonesBanner from '../assets/assest/banner/headphonesBanner.jpg'
import watchBanner from '../assets/assest/banner/watchBanner.jpg'
import speakersBanner from '../assets/assest/banner/speakersBanner.jpg'
import speakersBanner2 from '../assets/assest/banner/speakersBanner2.jpg'

// import earbudsBannerMobile from '../assets/assest/banner/earbudsBannerMobile.jpg'
// import neckbandsBannerMobile from '../assets/assest/banner/neckbandsBannerMobile.jpg'
// import headphonesBannerMobile from '../assets/assest/banner/headphonesBannerMobile.jpg'
// import watchBannerMobile from '../assets/assest/banner/watchBannerMobile.jpg'
// import speakersBannerMobile from '../assets/assest/banner/speakersBannerMobile.jpg'
// import speakersBannerMobile2 from '../assets/assest/banner/speakersBannerMobile2.jpg'

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        earbudsBanner,
        neckbandsBanner,
        headphonesBanner,
        watchBanner,
        speakersBanner,
        speakersBanner2
    ]

    // const mobileImages = [
    //     earbudsBannerMobile,
    //     neckbandsBannerMobile,
    //     headphonesBannerMobile,
    //     watchBannerMobile,
    //     speakersBannerMobile,
    //     speakersBannerMobile2
    // ]

    const nextImage = () => {
        setCurrentImage(prev => (prev + 1) % desktopImages.length)
    }

    const prevImage = () => {
        setCurrentImage(prev => (prev - 1 + desktopImages.length) % desktopImages.length)
    }

    useEffect(() => {
        const interval = setInterval(nextImage, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='container mx-auto px-4 rounded bg-white shadow-lg'>
            <div className='relative w-full' style={{ maxHeight: '400px' }}>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>
                    </div>
                </div>

                {/** Desktop and tablet version */}
                <div className='hidden md:flex w-full h-full overflow-hidden'>
                    {desktopImages.map((imageURl, index) => (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-transform flex-shrink-0' 
                            key={index}  
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img 
                                src={imageURl} 
                                className="w-full h-full object-contain" 
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

                {/** Mobile version */}
                <div className='flex w-full h-full overflow-hidden md:hidden'>
                    {desktopImages.map((imageURl, index) => (
                        <div 
                            className='w-full h-full min-w-full min-h-full transition-transform flex-shrink-0' 
                            key={index}  
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img 
                                src={imageURl} 
                                className="w-full h-full object-contain" 
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
