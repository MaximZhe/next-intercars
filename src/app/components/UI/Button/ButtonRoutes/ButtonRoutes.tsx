import NextLink from 'next/link';
import ArrowRight from '@/app/icons/svg/ArrowRight';
import style from './ButtonRoutes.module.scss';
import { FC } from 'react';

interface IButtonRoutesProps {
  className: string;
  title: string;
  to: string;
  state?: string;
  onClick?: () => void;
}

const ButtonRoutes: FC<IButtonRoutesProps> = ({
  className,
  title,
  to,
  state,
  onClick,
}) => {
  return (
    <NextLink href={to} as={state} passHref>
      <a className={`${style['button-more']} ${className}`} onClick={onClick}>
        {title}
        <ArrowRight className={style['button-more__icon']} />
      </a>
    </NextLink>
  );
};

export default ButtonRoutes;