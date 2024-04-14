'use client'
import  { FC, useEffect, useState } from 'react';
import DecrementIcon from '../../icons/image/decrement-icon.svg';
import IncrementIcon from '../../icons/image/increment-icon.svg';
import style from './Counter.module.scss';
import Image from 'next/image';


interface ICounterProps {
   className?: string;
   initialStateValue?: number,
   getCountValue?: (value: number) => void;
}
const Counter:FC <ICounterProps>= ({className, initialStateValue, getCountValue}) => {
    
    
    const [count, setCount] = useState(initialStateValue !== undefined ? initialStateValue :0);

    useEffect(() => {
        if (getCountValue) {
          getCountValue(count);
        }
      }, [count]);
    return (
        <div className={`${style.counter} ${className}`}>
            <button type='button' name='decrement'
                id='decrement'
                className={`${style['counter__btn']} ${count > 1 ? style.active : ''}`}
                onClick={() => setCount((prev) => prev - 1)}
                disabled={count < 2 ? true : false}
            >
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={DecrementIcon} alt=''
                />
            </button>
            <div className={style['counter__value']}>
                {count}
            </div>
            <button type='button' name='increment' id='increment'
                className={style['counter__btn']}
                onClick={() => setCount((prev) => prev + 1)}>
                <Image width={24} height={24}
                    className={style['counter__icon']}
                    src={IncrementIcon} alt=''
                />
            </button>
        </div>
    );
};

export default Counter;