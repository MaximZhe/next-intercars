'use client'

import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper";
import Image from 'next/image';
import Bus from '../../../icons/image/bus.jpg';
import BusTwo from '../../../icons/image/bus1.jpg';
import BusThree from '../../../icons/image/bus2.jpg';
import BusFour from '../../../icons/image/bus3.jpg';

import 'swiper/css';
import 'swiper/css/autoplay';

import ButtonRoutes from '../Button/ButtonRoutes/ButtonRoutes';
import { sliderRoutesInternational, sliderRoutesRussia } from '@/app/constant/constant';

interface ISliderSeo {
    
    className: string
}
const SliderSeo:FC <ISliderSeo> = ({className}) => {

    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const arrayImages = [Bus, BusTwo, BusThree, BusFour];
    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);
    return (
        <div className='container'>
            <div className='routes__wrapper'>
            </div>
            <Swiper className={`slider ${className}`} loop={true}
                onSwiper={setSwiper}
                modules={[Autoplay]}
                spaceBetween={32}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    480: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },

                    991: {
                        slidesPerView: 1,
                    },
                }}
            >
                {arrayImages.map((image, index) => (
                    <SwiperSlide
                    
                    className='slide' key={index}
                >
                    <div>
                        <Image src={image} alt="image" width={350} height={425} />
                    </div>
                </SwiperSlide>
                ))}
                
                
                
            </Swiper>
        </div>
    );
};

export default SliderSeo;