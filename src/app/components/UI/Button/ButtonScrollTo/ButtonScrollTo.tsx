'use client'
import Link from 'next/link';
import ArrowRight from '@/app/icons/svg/ArrowRight';
import style from './ButtonScrollTo.module.scss';
import { FC, useEffect, useState } from 'react';
import Button from '../Button';


interface IButtonRoutesProps {
  className: string;
  title: string;
  to: {
    pathname?: string,
    query?: {
      slug?: string,
      newsslug?: string,
      id?: number | string,
      niceUrl?: string
    }
  };
  state?: string;
  onClick?: () => void;

}

const ButtonRoutes = ({

}) => {

  const [scrollState, setScrollState] = useState(true);
  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY < 150) {
        setScrollState(true);
      } else {
        setScrollState(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);
  useEffect(() => {
    window.scrollY < 150 ? setScrollState(true) : setScrollState(false);
  }, [window.scrollY]);
  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    (<Button
      className={`${style['scroll-button']} ${scrollState ? style['up'] : ''}`}
      onClick={scroll}>
      <ArrowRight className={style['scroll-button__icon']} />

    </Button>)
  );
};

export default ButtonRoutes;