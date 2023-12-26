'use client'

import { FC } from "react";
interface ISliderTab {
    activeTab: string,
    handleClick: (name: string,) => void,
}
import style from './SliderTabsButtons.module.scss';

const SliderTabsButtons:FC<ISliderTab> = ({activeTab, handleClick} ) => {
    return (
        <div className={style['routes-tabs']}>
            <button className={`${style['routes-tabs__btn']}
                        ${activeTab === 'russia' ? 'active' : ''}`}
                type='button'
                name='russia'
                onClick={() => handleClick('russia')}>
                По России
            </button>
            <button className={`${style['routes-tabs__btn']}
                        ${activeTab === 'international' ? 'active' : ''}`}
                type='button'
                name='international'
                onClick={() => handleClick('international')}
            >
                Международные
            </button>
        </div>
    );
};

export default SliderTabsButtons;