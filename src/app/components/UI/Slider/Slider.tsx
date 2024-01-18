'use client'

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from "swiper";
import SliderNavButtons from './SliderNavButtons/SliderNavButtons';
import SliderTabsButtons from './SliderTabsButtons/SliderTabsButtons';

import style from './Slider.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

import ButtonRoutes from '../Button/ButtonRoutes/ButtonRoutes';
import { sliderRoutesInternational, sliderRoutesRussia } from '@/app/constant/constant';
import SlideItem from './SlideItem/SlideItem';



const Slider = ({ title, className }: { title: string, className: string }) => {
    const [activeTab, setActiveTab] = useState('russia');
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [isFirstSlide, setIsFirstSlide] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const handleReachEnd = () => {
        setIsFirstSlide(false);
        setIsLastSlide(false);
    };

    const handleReachBeginning = () => {
        setIsFirstSlide(false);
        setIsLastSlide(false);
        
    };

    useEffect(() => {
        if (swiper) {
            swiper.update();
        }
    }, [swiper]);

    const handleSlidePrev = () => {
        if (swiper) {
            swiper.slidePrev();
        }
    };

    const handleNavButtonNext = () => {
        if (swiper) {
            swiper.slideNext()
        }
    };

    const handleClick = (name: string) => {
        setActiveTab(name);
    }
    return (
        <div className={style.routes}>
            <div className='container'>
                <div className={style['routes__wrapper']}>
                    <h2 className={style['routes__title']}>
                        {title}
                    </h2>
                    <SliderTabsButtons activeTab={activeTab}
                        handleClick={(name) => handleClick(name)}
                    />
                    <SliderNavButtons
                        handleSlidePrev={handleSlidePrev}
                        handleNavButtonNext={handleNavButtonNext}
                        firstSlide={isFirstSlide}
                        lastSlide={isLastSlide}
                    />
                </div>
                <Swiper className={`slider ${className}`}
                    onReachEnd={handleReachEnd}
                    onReachBeginning={handleReachBeginning}
                    onSwiper={setSwiper}
                    modules={[Navigation]}
                    spaceBetween={32}
                    breakpoints={{
                        480: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },

                        991: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {activeTab === 'russia' ?
                        sliderRoutesRussia.map((slide) => (
                            <SwiperSlide
                                key={slide.id}
                                className='slide'
                            >
                                <SlideItem data={slide} />
                            </SwiperSlide>
                        )) :
                        sliderRoutesInternational.map((slide) => (
                            <SwiperSlide
                                key={slide.id}
                            >
                                <SlideItem data={slide} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className={style['routes-more']}>
                    <ButtonRoutes to={{ pathname: '/' }} title={'Все маршруты'} className={style['routes-more__link']} />
                </div>
            </div>
        </div>
    );
};

export default Slider;