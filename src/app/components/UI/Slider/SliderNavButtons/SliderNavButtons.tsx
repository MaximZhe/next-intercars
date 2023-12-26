'use client'

import ArrowIcon from "@/app/icons/svg/ArrowIcon";
import style from './SliderNavButtons.module.scss';

interface SliderNavButtonsProps {
  handleSlidePrev: () => void;
  handleNavButtonNext: () => void;
  lastSlide: boolean;
  firstSlide: boolean;
}

const SliderNavButtons: React.FC<SliderNavButtonsProps> = ({
  handleSlidePrev,
  handleNavButtonNext,
  lastSlide,
  firstSlide
}) => {
  return (
    <div className={style['slider-nav']}>
      <button
        disabled={firstSlide}
        type='button'
        className={`${style['slider-nav__btn']} ${firstSlide ? 'disabled' : ''} prev`}
        onClick={handleSlidePrev}>
        <ArrowIcon />
      </button>
      <button
        disabled={lastSlide}
        type='button'
        className={`${style['slider-nav__btn']} ${lastSlide ? 'disabled' : ''} next`}
        onClick={handleNavButtonNext}>
        <ArrowIcon />
      </button>
    </div>
  );
};

export default SliderNavButtons;